import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm'
import { Subcategory } from '../categories/subcategory.entity'
import { Save } from '../saves/save.entity'

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  slug: string

  @Column()
  name: string

  @Column()
  brand: string

  @Column('decimal', { precision: 10, scale: 2 })
  price: number

  @Column({ default: 0 })
  views: number

  @Column()
  image: string

  @Column('text', { array: true, default: [] })
  images: string[]

  @Column('text')
  description: string

  @Column('text', { array: true, default: [] })
  tags: string[]

  @Column({ nullable: true })
  affiliateUrl: string

  @Column({ nullable: true })
  asin: string

  @Column({ default: false })
  isSpotlight: boolean

  @Column('text', { array: true, default: [] })
  highlights: string[]

  @Column('text', { array: true, default: [] })
  itemDetails: string[]

  @Column('text', { array: true, default: [] })
  specs: string[]

  @ManyToOne(() => Subcategory, (sub) => sub.products, { nullable: true, eager: true, onDelete: 'SET NULL' })
  subcategory: Subcategory

  @OneToMany(() => Save, (save) => save.product)
  saves: Save[]

  @CreateDateColumn()
  createdAt: Date
}
