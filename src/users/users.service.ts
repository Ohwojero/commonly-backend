import { Injectable, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, password: string, name?: string, location?: string) {
    const exists = await this.repo.findOne({ where: { email } })
    if (exists) throw new ConflictException('Email already registered')
    const passwordHash = await bcrypt.hash(password, 10)
    return this.repo.save(this.repo.create({ email, passwordHash, name, location }))
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email }, select: ['id', 'email', 'passwordHash', 'role', 'name', 'location'] })
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } })
  }
}
