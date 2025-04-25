import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginateQueryDto {
  @ApiProperty({
    type: 'number',
    format: 'int',
    description: 'Page number to fetch',
    default: 0,
  })
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  page: number = 0;

  @ApiProperty({
    type: 'number',
    format: 'int',
    description: 'Specifies how many items should be returned in a page',
    default: 20,
    minimum: 1,
    maximum: 100,
  })
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsOptional()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number = 20;
}
