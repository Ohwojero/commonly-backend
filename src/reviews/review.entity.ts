import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Unique } from 'typeorm'
import { User } from '../users/user.entity'
import { Product } from '../products/product.entity'

@Entity('reviews')
@Unique(['user', 'product'])
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'int' })
  rating: number

  @Column({ type: 'text', nullable: true })
  body: string | null

  @ManyToOne(() => User, { onDelete: 'CASCADE', eager: true })
  user: User

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  product: Product

  @CreateDateColumn()
  createdAt: Date
}
