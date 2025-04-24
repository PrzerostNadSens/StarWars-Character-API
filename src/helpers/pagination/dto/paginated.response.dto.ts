import { ApiProperty } from '@nestjs/swagger';

class PaginationData {
  @ApiProperty({ type: 'number' })
  count: number;

  @ApiProperty({ type: 'number' })
  totalElements: number;

  @ApiProperty({ type: 'number' })
  page: number;

  @ApiProperty({ type: 'number' })
  pageSize: number;

  @ApiProperty({ type: 'number' })
  totalPages: number;

  @ApiProperty({ type: 'boolean' })
  firstPage: boolean;

  @ApiProperty({ type: 'boolean' })
  lastPage: boolean;
}
export class PaginatedResponse<T> {
  @ApiProperty()
  items: T[];
  @ApiProperty()
  pagination: PaginationData;
}
