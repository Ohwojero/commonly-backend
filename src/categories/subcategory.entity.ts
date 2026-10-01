import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { Category } from './category.entity'
import { Product } from '../products/product.entity'

@Entity('subcategories')
export class Subcategory {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  slug: string

  @Column()
  label: string

  @Column({ nullable: true })
  image: string

  @ManyToOne(() => Category, (cat) => cat.subcategories, { onDelete: 'CASCADE' })
  category: Category

  @OneToMany(() => Product, (p) => p.subcategory)
  products: Product[]
}
