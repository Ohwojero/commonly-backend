import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { config } from 'dotenv'
import { Category } from './categories/category.entity'
import { Subcategory } from './categories/subcategory.entity'
import { Product } from './products/product.entity'
import { User } from './users/user.entity'
import { Save } from './saves/save.entity'
import { ActivityLog } from './activity/activity.entity'

config()

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Category, Subcategory, Product, User, Save, ActivityLog],
  synchronize: true,
  ssl: process.env.DATABASE_URL?.includes('supabase.co') ? { rejectUnauthorized: false } : false,
})

async function seed() {
  await AppDataSource.initialize()
  console.log('Connected to database')

  await AppDataSource.getRepository(ActivityLog).createQueryBuilder().delete().execute()
  await AppDataSource.getRepository(Save).createQueryBuilder().delete().execute()
  await AppDataSource.getRepository(Product).createQueryBuilder().delete().execute()
  await AppDataSource.getRepository(Subcategory).createQueryBuilder().delete().execute()
  await AppDataSource.getRepository(Category).createQueryBuilder().delete().execute()

  console.log('All data cleared. Use the admin panel to add categories and products via the API.')

  await AppDataSource.destroy()
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
