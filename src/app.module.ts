import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/user.entity'
import { Product } from './products/product.entity'
import { Category } from './categories/category.entity'
import { Subcategory } from './categories/subcategory.entity'
import { Save } from './saves/save.entity'
import { ActivityLog } from './activity/activity.entity'
import { Review } from './reviews/review.entity'
import { ProductsModule } from './products/products.module'
import { CategoriesModule } from './categories/categories.module'
import { UsersModule } from './users/users.module'
import { SavesModule } from './saves/saves.module'
import { AuthModule } from './auth/auth.module'
import { ActivityModule } from './activity/activity.module'
import { ReviewsModule } from './reviews/reviews.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        entities: [User, Product, Category, Subcategory, Save, ActivityLog, Review],
        synchronize: config.get('NODE_ENV') !== 'production',
        ssl:
          config.get('NODE_ENV') === 'production' || config.get<string>('DATABASE_URL')?.includes('supabase.co')
            ? { rejectUnauthorized: false }
            : false,
      }),
    }),
    ProductsModule,
    CategoriesModule,
    UsersModule,
    SavesModule,
    AuthModule,
    ActivityModule,
    ReviewsModule,
  ],
})
export class AppModule {}
