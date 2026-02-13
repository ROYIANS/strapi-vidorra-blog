import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { createPublicKey } from 'crypto';
import { AuthService } from '../auth.service';

type JwtHeader = {
  kid?: string;
  alg?: string;
};

type Jwk = {
  kid?: string;
  kty?: string;
  n?: string;
  e?: string;
  [key: string]: unknown;
};

type JwksResponse = {
  keys?: Jwk[];
};

function normalizePemKey(rawValue: string) {
  if (!rawValue) return '';

  return rawValue
    .replace(/\\n/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');
}

function getCacheTtlMs(response: Response) {
  const cacheControl = response.headers.get('cache-control') ?? '';
  const match = cacheControl.match(/max-age=(\d+)/);
  if (!match) return 5 * 60 * 1000;
  const maxAge = Number(match[1]);
  return Number.isFinite(maxAge) ? maxAge * 1000 : 5 * 60 * 1000;
}

function parseJwtHeader(rawJwtToken: string): JwtHeader {
  const [headerPart] = rawJwtToken.split('.');
  if (!headerPart) {
    throw new Error('Malformed JWT token');
  }

  const headerJson = Buffer.from(headerPart, 'base64url').toString('utf8');
  return JSON.parse(headerJson) as JwtHeader;
}

function createClerkJwksKeyProvider(jwksUrl: string) {
  let cachedKeys: Jwk[] = [];
  let cacheExpiresAt = 0;
  const signingKeyCache = new Map<string, string>();

  const loadKeys = async (forceRefresh = false) => {
    if (!forceRefresh && Date.now() < cacheExpiresAt && cachedKeys.length > 0) {
      return cachedKeys;
    }

    const response = await fetch(jwksUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch JWKS: ${response.status}`);
    }

    const body = (await response.json()) as JwksResponse;
    const keys = Array.isArray(body.keys) ? body.keys : [];

    if (keys.length === 0) {
      throw new Error('JWKS contains no keys');
    }

    cachedKeys = keys;
    cacheExpiresAt = Date.now() + getCacheTtlMs(response);
    return cachedKeys;
  };

  const findSigningKey = async (kid: string) => {
    if (signingKeyCache.has(kid)) {
      return signingKeyCache.get(kid)!;
    }

    let keys = await loadKeys();
    let jwk = keys.find((key) => key.kid === kid);
    if (!jwk) {
      keys = await loadKeys(true);
      jwk = keys.find((key) => key.kid === kid);
    }

    if (!jwk) {
      throw new Error(`Unable to find JWKS key for kid: ${kid}`);
    }

    if (jwk.kty !== 'RSA') {
      throw new Error(`Unsupported JWKS key type: ${String(jwk.kty)}`);
    }
    if (!jwk.n || !jwk.e) {
      throw new Error('JWKS RSA key missing modulus/exponent');
    }

    const keyObject = createPublicKey({
      key: {
        kty: 'RSA',
        n: jwk.n,
        e: jwk.e,
      },
      format: 'jwk',
    });
    const pem = keyObject.export({ format: 'pem', type: 'spki' }).toString();
    signingKeyCache.set(kid, pem);
    return pem;
  };

  return async (rawJwtToken: string) => {
    const header = parseJwtHeader(rawJwtToken);
    if (header.alg && header.alg !== 'RS256') {
      throw new Error(`Unexpected JWT algorithm: ${header.alg}`);
    }
    if (!header.kid) {
      throw new Error('JWT header missing kid');
    }
    return findSigningKey(header.kid);
  };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    const jwksUrl = configService.get<string>('CLERK_JWKS_URL', '').trim();
    const verificationKey = normalizePemKey(
      configService.get<string>('CLERK_JWT_VERIFICATION_KEY', ''),
    );
    const hasJwksUrl = jwksUrl.length > 0;
    const hasVerificationKey = verificationKey.length > 0;

    if (!hasJwksUrl && !hasVerificationKey) {
      throw new Error('Missing CLERK_JWKS_URL or CLERK_JWT_VERIFICATION_KEY');
    }

    const keyProvider = hasJwksUrl ? createClerkJwksKeyProvider(jwksUrl) : null;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['RS256'],
      ...(hasJwksUrl
        ? {
            secretOrKeyProvider: (_request, rawJwtToken, done) => {
              keyProvider!(rawJwtToken)
                .then((key) => done(null, key))
                .catch((error: unknown) => done(error as Error));
            },
          }
        : { secretOrKey: verificationKey }),
    });
  }

  async validate(payload: any) {
    return this.authService.validateClerkUser(payload);
  }
}
