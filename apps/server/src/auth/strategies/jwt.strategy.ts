import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    const verificationKey = configService
      .get<string>('CLERK_JWT_VERIFICATION_KEY', '')
      .replace(/\\n/g, '\n');

    if (!verificationKey) {
      throw new Error('Missing CLERK_JWT_VERIFICATION_KEY');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: verificationKey,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return this.authService.validateClerkUser(payload);
  }
}
