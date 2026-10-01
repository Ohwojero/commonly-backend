import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ActivityLog } from './activity.entity'

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityLog)
    private repo: Repository<ActivityLog>,
  ) {}

  findAll() {
    return this.repo.find({
      order: { createdAt: 'DESC' },
      take: 100,
    })
  }

  create(dto: {
    eventType: string
    eventName: string
    email?: string
    location?: string
    productSlug?: string
  }) {
    const log = this.repo.create(dto)
    return this.repo.save(log)
  }
}
