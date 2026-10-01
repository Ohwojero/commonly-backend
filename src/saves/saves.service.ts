import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Save } from './save.entity'

@Injectable()
export class SavesService {
  constructor(@InjectRepository(Save) private repo: Repository<Save>) {}

  async toggle(userId: string, productId: string) {
    const existing = await this.repo.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    })
    if (existing) {
      await this.repo.remove(existing)
      return { saved: false }
    }
    await this.repo.save(this.repo.create({ user: { id: userId }, product: { id: productId } }))
    return { saved: true }
  }

  async remove(userId: string, productId: string) {
    const existing = await this.repo.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    })
    if (existing) await this.repo.remove(existing)
    return { saved: false }
  }

  getUserSaves(userId: string) {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['product'],
      order: { savedAt: 'DESC' },
    })
  }

  async getSavedProductIds(userId: string): Promise<string[]> {
    const saves = await this.repo.find({
      where: { user: { id: userId } },
      relations: ['product'],
    })
    return saves.map((s) => s.product.id)
  }
}
