import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('activity_logs')
export class ActivityLog {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'event_type' })
  eventType: string

  @Column({ name: 'event_name' })
  eventName: string

  @Column({ nullable: true })
  email?: string

  @Column({ nullable: true })
  location?: string

  @Column({ name: 'product_slug', nullable: true })
  productSlug?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
