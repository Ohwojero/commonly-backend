import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'
import { ActivityService } from './activity.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../auth/roles.guard'
import { Roles } from '../auth/roles.decorator'

@Controller('activity')
export class ActivityController {
  constructor(private readonly service: ActivityService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll() {
    return this.service.findAll()
  }

  @Post()
  create(
    @Body()
    dto: {
      eventType: string
      eventName: string
      email?: string
      location?: string
      productSlug?: string
    },
  ) {
    return this.service.create(dto)
  }
}
