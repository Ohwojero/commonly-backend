import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Save } from './save.entity'
import { SavesService } from './saves.service'
import { SavesController } from './saves.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Save])],
  providers: [SavesService],
  controllers: [SavesController],
})
export class SavesModule {}
