import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Review } from './review.entity'
import { Product } from '../products/product.entity'

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private repo: Repository<Review>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async getByProduct(productSlug: string) {
    const product = await this.productRepo.findOne({ where: { slug: productSlug } })
    if (!product) throw new NotFoundException('Product not found')

    const reviews = await this.repo.find({
      where: { product: { id: product.id } },
      order: { createdAt: 'DESC' },
    })

    const count = reviews.length
    const avg = count ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0

    return {
      rating: Math.round(avg * 10) / 10,
      reviewCount: count,
      reviews: reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        body: r.body,
        createdAt: r.createdAt,
        user: { id: r.user.id, name: r.user.name, email: r.user.email },
      })),
    }
  }

  async submit(productSlug: string, userId: string, rating: number, body?: string) {
    const product = await this.productRepo.findOne({ where: { slug: productSlug } })
    if (!product) throw new NotFoundException('Product not found')

    const existing = await this.repo.findOne({
      where: { product: { id: product.id }, user: { id: userId } },
    })
    if (existing) throw new ConflictException('You have already reviewed this product')

    const review = this.repo.create({ rating, body: body ?? null, user: { id: userId } as any, product })
    await this.repo.save(review)
    return this.getByProduct(productSlug)
  }

  async update(reviewId: string, userId: string, rating: number, body?: string) {
    const review = await this.repo.findOne({ where: { id: reviewId }, relations: ['user', 'product'] })
    if (!review) throw new NotFoundException('Review not found')
    if (review.user.id !== userId) throw new ForbiddenException()

    review.rating = rating
    review.body = body ?? null
    await this.repo.save(review)
    return this.getByProduct(review.product.slug)
  }

  async remove(reviewId: string, requesterId: string, requesterRole: string) {
    const review = await this.repo.findOne({ where: { id: reviewId }, relations: ['user', 'product'] })
    if (!review) throw new NotFoundException('Review not found')
    if (requesterRole !== 'admin' && review.user.id !== requesterId) throw new ForbiddenException()

    const slug = review.product.slug
    await this.repo.remove(review)
    return this.getByProduct(slug)
  }
}
