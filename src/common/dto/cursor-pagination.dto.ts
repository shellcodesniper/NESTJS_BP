import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

/* NOTE:
 * @Expose() 를 붙인 것만 결과에 포함됨!
 * https://github.com/typestack/class-transformer#expose-decorator 확인
 * @ApiProperty() 는 swagger 문서에만 포함됨!
 * https://docs.nestjs.com/recipes/swagger#api-property 확인
 * IsNumber, IsOptional, ... 등은 validation 을 위한 것임!
 * https://docs.nestjs.com/techniques/validation 확인
*/

// NOTE : PAGINATION [https://www.prisma.io/docs/concepts/components/prisma-client/pagination]

// TYPE : 해당 DTO 는 Offset-Based Pagination 을 위한 기본 DTO.

export class CursorPaginationBase {
  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'id:asc', required: false, default: 'id:asc', description: 'Order By' })
  orderBy: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ example: '0', required: false, default: '0', description: 'Cursor' })
  cursor: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ example: '10', required: false, default: '10', description: 'Take' })
  take: string;

  @Expose()
  @IsString()
  @IsOptional()
  @ApiProperty({ example: '0', required: false, default: '0', description: 'Skip' })
  skip: string;

}
