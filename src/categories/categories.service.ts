import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './category.entity'
import { Subcategory } from './subcategory.entity'
import { Product } from '../products/product.entity'

const toSlug = (str: string) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Subcategory) private subcategoryRepo: Repository<Subcategory>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.categoryRepo.find({ relations: ['subcategories'] })
  }

  async findBySlug(slug: string) {
    const category = await this.categoryRepo.findOne({
      where: { slug },
      relations: ['subcategories'],
    })
    if (!category) throw new NotFoundException(`Category "${slug}" not found`)
    return category
  }

  async findSubcategory(categorySlug: string, subcategorySlug: string) {
    const sub = await this.subcategoryRepo.findOne({
      where: { slug: subcategorySlug, category: { slug: categorySlug } },
      relations: ['category'],
    })
    if (!sub) throw new NotFoundException(`Subcategory "${subcategorySlug}" not found`)
    return sub
  }

  async create(dto: {
    label: string
    slug?: string
    eyebrow?: string
    title?: string
    description?: string
    image?: string
    tone?: string
    items?: string[]
  }) {
    const slug = dto.slug || toSlug(dto.label)
    const category = this.categoryRepo.create({
      slug,
      label: dto.label,
      eyebrow: dto.eyebrow || `The ${dto.label.toLowerCase()} edit`,
      title: dto.title || `Explore ${dto.label.toLowerCase()} more intentionally.`,
      description: dto.description || `A considered collection of ${dto.label.toLowerCase()} picks.`,
      image: dto.image || '',
      tone: dto.tone || 'bg-secondary',
    })
    const saved = await this.categoryRepo.save(category)

    if (dto.items && dto.items.length > 0) {
      for (const item of dto.items) {
        const itemSlug = toSlug(item)
        const sub = this.subcategoryRepo.create({
          slug: itemSlug,
          label: item,
          image: dto.image || '',
          category: saved,
        })
        await this.subcategoryRepo.save(sub)
      }
    }

    return this.findBySlug(saved.slug)
  }

  async update(
    slug: string,
    dto: {
      label?: string
      eyebrow?: string
      title?: string
      description?: string
      image?: string
      tone?: string
      items?: string[]
    },
  ) {
    const category = await this.findBySlug(slug)
    if (dto.label !== undefined) category.label = dto.label
    if (dto.eyebrow !== undefined) category.eyebrow = dto.eyebrow
    if (dto.title !== undefined) category.title = dto.title
    if (dto.description !== undefined) category.description = dto.description
    if (dto.image !== undefined) category.image = dto.image
    if (dto.tone !== undefined) category.tone = dto.tone
    await this.categoryRepo.save(category)

    if (dto.items) {
      // Create new subcategories if they don't already exist
      const existingSlugs = new Set(category.subcategories?.map((s) => s.slug) || [])
      for (const item of dto.items) {
        const itemSlug = toSlug(item)
        if (!existingSlugs.has(itemSlug)) {
          const sub = this.subcategoryRepo.create({
            slug: itemSlug,
            label: item,
            image: category.image,
            category,
          })
          await this.subcategoryRepo.save(sub)
        }
      }
    }

    return this.findBySlug(slug)
  }

  async remove(slug: string) {
    const category = await this.findBySlug(slug)
    return this.categoryRepo.remove(category)
  }

  async addSubcategory(categorySlug: string, label: string) {
    const category = await this.findBySlug(categorySlug)
    const slug = toSlug(label)
    const existing = await this.subcategoryRepo.findOne({ where: { slug } })
    if (existing) throw new Error(`Subcategory "${slug}" already exists`)
    const sub = this.subcategoryRepo.create({ slug, label, image: category.image, category })
    await this.subcategoryRepo.save(sub)
    return this.findBySlug(categorySlug)
  }

  async updateSubcategory(slug: string, label: string) {
    const sub = await this.subcategoryRepo.findOne({ where: { slug }, relations: ['category'] })
    if (!sub) throw new NotFoundException(`Subcategory "${slug}" not found`)
    sub.label = label
    await this.subcategoryRepo.save(sub)
    return this.findBySlug(sub.category.slug)
  }

  async removeSubcategory(slug: string) {
    const sub = await this.subcategoryRepo.findOne({ where: { slug }, relations: ['category'] })
    if (!sub) throw new NotFoundException(`Subcategory "${slug}" not found`)
    const categorySlug = sub.category.slug
    await this.subcategoryRepo.remove(sub)
    return this.findBySlug(categorySlug)
  }

  async updateSubcategoryImage(slug: string, image: string) {
    const sub = await this.subcategoryRepo.findOne({ where: { slug } })
    if (!sub) throw new NotFoundException(`Subcategory "${slug}" not found`)
    sub.image = image
    return this.subcategoryRepo.save(sub)
  }

  async getAllMedia() {
    const [products, categories, subcategories] = await Promise.all([
      this.productRepo.find({ select: ['id', 'name', 'slug', 'image', 'brand'] }),
      this.categoryRepo.find({ select: ['id', 'label', 'slug', 'image'] }),
      this.subcategoryRepo.find({ select: ['id', 'label', 'slug', 'image'] }),
    ])

    const media = [
      ...products
        .filter((p) => !!p.image)
        .map((p) => ({
          id: `product-${p.id}`,
          title: `${p.brand} - ${p.name}`,
          slug: p.slug,
          type: 'Product' as const,
          url: p.image,
        })),
      ...categories
        .filter((c) => !!c.image)
        .map((c) => ({
          id: `category-${c.id}`,
          title: c.label,
          slug: c.slug,
          type: 'Category' as const,
          url: c.image,
        })),
      ...subcategories
        .filter((s) => !!s.image)
        .map((s) => ({
          id: `subcategory-${s.id}`,
          title: s.label,
          slug: s.slug,
          type: 'Subcategory' as const,
          url: s.image,
        })),
    ]

    return media
  }

  async removeMediaImage(type: string, slug: string) {
    if (type.toLowerCase() === 'subcategory') {
      const sub = await this.subcategoryRepo.findOne({ where: { slug } })
      if (sub) {
        sub.image = ''
        return this.subcategoryRepo.save(sub)
      }
    } else if (type.toLowerCase() === 'product') {
      const prod = await this.productRepo.findOne({ where: { slug } })
      if (prod) {
        prod.image = ''
        return this.productRepo.save(prod)
      }
    } else if (type.toLowerCase() === 'category') {
      const cat = await this.categoryRepo.findOne({ where: { slug } })
      if (cat) {
        cat.image = ''
        return this.categoryRepo.save(cat)
      }
    }
    return { success: true }
  }
}
