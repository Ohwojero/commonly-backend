import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly service: ReviewsService) {}

  @Get(':productSlug')
  getByProduct(@Param('productSlug') productSlug: string) {
    return this.service.getByProduct(productSlug)
  }

  @Post(':productSlug')
  @UseGuards(JwtAuthGuard)
  submit(
    @Param('productSlug') productSlug: string,
    @Body() body: { rating: number; body?: string },
    @Request() req: any,
  ) {
    return this.service.submit(productSlug, req.user.id, body.rating, body.body)
  }

  @Put(':reviewId')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('reviewId') reviewId: string,
    @Body() body: { rating: number; body?: string },
    @Request() req: any,
  ) {
    return this.service.update(reviewId, req.user.id, body.rating, body.body)
  }

  @Delete(':reviewId')
  @UseGuards(JwtAuthGuard)
  remove(@Param('reviewId') reviewId: string, @Request() req: any) {
    return this.service.remove(reviewId, req.user.id, req.user.role)
  }
}
