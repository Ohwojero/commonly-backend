import { IsString, IsNumber, IsOptional, IsArray, Min, IsBoolean } from 'class-validator'

export class CreateProductDto {
  @IsString()
  slug: string

  @IsString()
  name: string

  @IsString()
  brand: string

  @IsNumber()
  @Min(0)
  price: number

  @IsString()
  image: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[]

  @IsString()
  description: string

  @IsOptional()
  @IsNumber()
  rating?: number

  @IsOptional()
  @IsNumber()
  reviews?: number

  @IsOptional()
  @IsNumber()
  views?: number

  @IsOptional()
  @IsArray()
  tags?: string[]

  @IsOptional()
  @IsString()
  affiliateUrl?: string

  @IsOptional()
  @IsString()
  asin?: string

  @IsOptional()
  @IsBoolean()
  isSpotlight?: boolean

  @IsOptional()
  @IsArray()
  highlights?: string[]

  @IsOptional()
  @IsArray()
  itemDetails?: string[]

  @IsOptional()
  @IsArray()
  specs?: string[]

  @IsOptional()
  @IsString()
  subcategorySlug?: string

  @IsOptional()
  @IsString()
  categorySlug?: string

  @IsOptional()
  @IsString()
  subcategoryLabel?: string
}
