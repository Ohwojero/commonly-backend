import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm'
import { Save } from '../saves/save.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column({ select: false })
  passwordHash: string

  @Column({ nullable: true })
  name: string

  @Column({ nullable: true })
  location: string

  @Column({ default: 'user' })
  role: string

  @OneToMany(() => Save, (save) => save.user)
  saves: Save[]

  @CreateDateColumn()
  createdAt: Date
}
