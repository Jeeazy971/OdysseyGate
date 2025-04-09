import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'odysseygatejwtsecret',
    });
  }

  async validate(payload: any) {
    // Le payload doit contenir, par exemple, sub (id) et email
    return { id: payload.sub, email: payload.email };
  }
}
