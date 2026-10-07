import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { UsersService } from '../users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET') || 'commonly-default-jwt-secret-key',
    })
  }

  async validate(payload: { sub: string; email: string }) {
    const user = await this.usersService.findById(payload.sub)
    if (!user) throw new UnauthorizedException()
    return { id: user.id, email: user.email, role: user.role }
  }
}
