import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ClerkWebhookController } from './clerk-webhook.controller';
import { ClerkWebhookService } from './clerk-webhook.service';

@Module({
  imports: [
    PassportModule,
  ],
  controllers: [AuthController, ClerkWebhookController],
  providers: [AuthService, JwtStrategy, ClerkWebhookService],
  exports: [AuthService],
})
export class AuthModule {}
