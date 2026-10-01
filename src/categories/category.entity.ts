import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Subcategory } from './subcategory.entity'

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  slug: string

  @Column()
  label: string

  @Column()
  eyebrow: string

  @Column()
  title: string

  @Column('text')
  description: string

  @Column()
  image: string

  @Column({ default: 'bg-secondary' })
  tone: string

  @OneToMany(() => Subcategory, (sub) => sub.category, { cascade: true, eager: true })
  subcategories: Subcategory[]
}
