import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, // We need UsersModule to fetch user data
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supers3cr3t_must_change_in_prod',
      signOptions: { expiresIn: '1h' }, // Standard expiration
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
