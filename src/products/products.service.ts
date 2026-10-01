import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './product.entity'
import { Subcategory } from '../categories/subcategory.entity'
import { Category } from '../categories/category.entity'
import { Review } from '../reviews/review.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { QueryProductDto } from './dto/query-product.dto'

const toSlug = (str: string) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
    @InjectRepository(Subcategory) private subcategoryRepo: Repository<Subcategory>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
  ) {}

  private async attachReviewStats<T extends Product>(products: T[]): Promise<(T & { rating: number; reviewCount: number })[]> {
    if (!products.length) return products.map(p => ({ ...p, rating: 0, reviewCount: 0 }))
    const ids = products.map(p => p.id)
    const stats = await this.reviewRepo
      .createQueryBuilder('r')
      .select('r.productId', 'productId')
      .addSelect('AVG(r.rating)', 'avg')
      .addSelect('COUNT(r.id)', 'count')
      .where('r.productId IN (:...ids)', { ids })
      .groupBy('r.productId')
      .getRawMany()
    const map = new Map(stats.map(s => [s.productId, { avg: parseFloat(s.avg), count: parseInt(s.count) }]))
    return products.map(p => ({
      ...p,
      rating: map.has(p.id) ? Math.round(map.get(p.id)!.avg * 10) / 10 : 0,
      reviewCount: map.has(p.id) ? map.get(p.id)!.count : 0,
    }))
  }

  async findAll(query: QueryProductDto) {
    const qb = this.repo.createQueryBuilder('p')
      .leftJoinAndSelect('p.subcategory', 'sub')
      .leftJoinAndSelect('sub.category', 'cat')

    if (query.category) qb.andWhere('cat.slug = :cat', { cat: query.category })
    if (query.subcategory) qb.andWhere('sub.slug = :sub', { sub: query.subcategory })
    if (query.tag) qb.andWhere(':tag = ANY(p.tags)', { tag: query.tag })

    if (query.sort === 'views') qb.orderBy('p.views', 'DESC')
    else if (query.sort === 'price') qb.orderBy('p.price', 'ASC')
    else qb.orderBy('p.createdAt', 'DESC')

    const products = await qb.getMany()
    return this.attachReviewStats(products)
  }

  async findBySlug(slug: string) {
    const product = await this.repo.findOne({
      where: { slug },
      relations: ['subcategory', 'subcategory.category'],
    })
    if (!product) throw new NotFoundException(`Product "${slug}" not found`)
    const [withStats] = await this.attachReviewStats([product])
    return withStats
  }

  async incrementView(slug: string) {
    await this.repo.increment({ slug }, 'views', 1)
    return { ok: true }
  }

  private async resolveSubcategory(
    subcategorySlug?: string,
    categorySlug?: string,
    subcategoryLabel?: string,
  ): Promise<Subcategory | null> {
    if (subcategorySlug) {
      let sub = await this.subcategoryRepo.findOne({
        where: { slug: subcategorySlug },
        relations: ['category'],
      })
      if (!sub && categorySlug) {
        const cat = await this.categoryRepo.findOne({
          where: { slug: categorySlug },
          relations: ['subcategories'],
        })
        if (cat) {
          sub = this.subcategoryRepo.create({
            slug: subcategorySlug,
            label: subcategoryLabel || subcategorySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
            image: cat.image,
            category: cat,
          })
          await this.subcategoryRepo.save(sub)
        }
      }
      if (sub) return sub
    }

    if (categorySlug) {
      const cat = await this.categoryRepo.findOne({
        where: { slug: categorySlug },
        relations: ['subcategories'],
      })
      if (cat) {
        if (cat.subcategories && cat.subcategories.length > 0) {
          return cat.subcategories[0]
        }
        const defaultSub = this.subcategoryRepo.create({
          slug: `${cat.slug}-curations`,
          label: `${cat.label} Curations`,
          image: cat.image,
          category: cat,
        })
        return this.subcategoryRepo.save(defaultSub)
      }
    }

    return null
  }

  async create(dto: CreateProductDto) {
    const { subcategorySlug, categorySlug, subcategoryLabel, ...productData } = dto

    if (productData.isSpotlight) {
      await this.repo.update({}, { isSpotlight: false })
    }

    const product = this.repo.create(productData)

    const sub = await this.resolveSubcategory(subcategorySlug, categorySlug, subcategoryLabel)
    if (sub) {
      product.subcategory = sub
    }

    const saved = await this.repo.save(product)
    return this.findBySlug(saved.slug)
  }

  async update(slug: string, dto: Partial<CreateProductDto>) {
    const product = await this.findBySlug(slug)
    const { subcategorySlug, categorySlug, subcategoryLabel, ...productData } = dto

    if (productData.isSpotlight) {
      await this.repo.update({}, { isSpotlight: false })
    }

    Object.assign(product, productData)

    if (subcategorySlug !== undefined || categorySlug !== undefined) {
      const sub = await this.resolveSubcategory(subcategorySlug, categorySlug, subcategoryLabel)
      if (sub) {
        product.subcategory = sub
      }
    }

    await this.repo.save(product)
    return this.findBySlug(slug)
  }

  async remove(slug: string) {
    const product = await this.findBySlug(slug)
    return this.repo.remove(product)
  }
}
