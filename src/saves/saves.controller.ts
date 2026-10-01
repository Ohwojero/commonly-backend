import { Controller, Get, Post, Delete, Param, UseGuards, Request } from '@nestjs/common'
import { SavesService } from './saves.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('saves')
@UseGuards(JwtAuthGuard)
export class SavesController {
  constructor(private readonly service: SavesService) {}

  @Get()
  getMySaves(@Request() req) {
    return this.service.getUserSaves(req.user.id)
  }

  @Get('ids')
  getSavedIds(@Request() req) {
    return this.service.getSavedProductIds(req.user.id)
  }

  @Post(':productId')
  toggle(@Param('productId') productId: string, @Request() req) {
    return this.service.toggle(req.user.id, productId)
  }

  @Delete(':productId')
  remove(@Param('productId') productId: string, @Request() req) {
    return this.service.remove(req.user.id, productId)
  }
}
