import { ApiProperty } from "@nestjs/swagger";
import { OffsetPaginationBase } from "@root/src/common/dto/offset-pagination.dto";
import { Transform } from "class-transformer";
import { IsString, ValidateIf } from "class-validator";

/* NOTE:
 * @Expose() 를 붙인 것만 결과에 포함됨!
 * https://github.com/typestack/class-transformer#expose-decorator 확인
 * @ApiProperty() 는 swagger 문서에만 포함됨!
 * https://docs.nestjs.com/recipes/swagger#api-property 확인
 * IsNumber, IsOptional, ... 등은 validation 을 위한 것임!
 * https://docs.nestjs.com/techniques/validation 확인
*/

export class FilterPostDto extends OffsetPaginationBase {
  @IsString()
  @ApiProperty({ title: '제목', example: '검색어', required: false, default: '', description: '검색어' })
  @ValidateIf((o) => !o.content || o.content.lenght === 0 || o.title )
  @Transform(({ value }) => value || undefined)
  title?: string;

  @IsString()
  @ApiProperty({ title: '내용', example: '검색어', required: false, default: '', description: '검색어' })
  @ValidateIf((o) => !o.title || o.title.lenght === 0 || o.content )
  @Transform(({ value }) => value || undefined)
  content?: string;
}

