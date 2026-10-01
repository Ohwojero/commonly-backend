import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RolesGuard } from '../auth/roles.guard'
import { Roles } from '../auth/roles.decorator'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get('media/all')
  getAllMedia() {
    return this.service.getAllMedia()
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.service.findBySlug(slug)
  }

  @Get(':slug/:subcategory')
  findSubcategory(@Param('slug') slug: string, @Param('subcategory') subcategory: string) {
    return this.service.findSubcategory(slug, subcategory)
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() dto: any) {
    return this.service.create(dto)
  }

  @Post(':slug/subcategories')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  addSubcategory(@Param('slug') slug: string, @Body('label') label: string) {
    return this.service.addSubcategory(slug, label)
  }

  @Put('subcategories/:slug/label')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateSubcategory(@Param('slug') slug: string, @Body('label') label: string) {
    return this.service.updateSubcategory(slug, label)
  }

  @Delete('subcategories/:slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  removeSubcategory(@Param('slug') slug: string) {
    return this.service.removeSubcategory(slug)
  }

  @Put('subcategories/:slug/image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateSubcategoryImage(
    @Param('slug') slug: string,
    @Body('image') image: string,
  ) {
    return this.service.updateSubcategoryImage(slug, image)
  }

  @Put(':slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('slug') slug: string, @Body() dto: any) {
    return this.service.update(slug, dto)
  }

  @Delete(':slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('slug') slug: string) {
    return this.service.remove(slug)
  }

  @Delete('media/:type/:slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  removeMediaImage(@Param('type') type: string, @Param('slug') slug: string) {
    return this.service.removeMediaImage(type, slug)
  }
}
