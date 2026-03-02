import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

// The return value of validate() is injected into the request object as req.user
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supers3cr3t_must_change_in_prod',
    });
  }

  async validate(payload: any) {
    // Check if user still exists
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found or token invalid');
    }

    // Returning this attached to Request as req.user
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
