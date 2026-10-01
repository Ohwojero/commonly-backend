import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Review } from './review.entity'
import { Product } from '../products/product.entity'
import { ReviewsService } from './reviews.service'
import { ReviewsController } from './reviews.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Review, Product])],
  providers: [ReviewsService],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
