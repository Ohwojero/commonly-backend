import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Unique } from 'typeorm'
import { User } from '../users/user.entity'
import { Product } from '../products/product.entity'

@Entity('saves')
@Unique(['user', 'product'])
export class Save {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, (user) => user.saves, { onDelete: 'CASCADE' })
  user: User

  @ManyToOne(() => Product, (product) => product.saves, { onDelete: 'CASCADE', eager: true })
  product: Product

  @CreateDateColumn()
  savedAt: Date
}
