import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, name: string | undefined, location: string) {
    const user = await this.usersService.create(email, password, name, location)
    return this.signToken(user.id, user.email, user.role, user.name, user.location)
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (!user) throw new UnauthorizedException('Invalid credentials')
    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) throw new UnauthorizedException('Invalid credentials')
    return this.signToken(user.id, user.email, user.role, user.name, user.location)
  }

  async getMe(userId: string) {
    const user = await this.usersService.findById(userId)
    if (!user) throw new UnauthorizedException()
    return { id: user.id, email: user.email, name: user.name, location: user.location, role: user.role, createdAt: user.createdAt }
  }

  private signToken(id: string, email: string, role: string, name?: string, location?: string) {
    return {
      access_token: this.jwtService.sign({ sub: id, email, role, name, location }),
      user: { id, email, name, location, role },
    }
  }
}
