import { IsOptional, IsString, IsIn } from 'class-validator'

export class QueryProductDto {
  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @IsString()
  subcategory?: string

  @IsOptional()
  @IsString()
  tag?: string

  @IsOptional()
  @IsIn(['views', 'rating', 'price', 'newest'])
  sort?: string
}
