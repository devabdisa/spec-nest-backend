import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// "jwt" corresponds to the default name of the strategy provided by passport-jwt
export class JwtAuthGuard extends AuthGuard('jwt') {}
