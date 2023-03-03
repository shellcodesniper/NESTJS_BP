import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

/* NOTE:
 * @Expose() 를 붙인 것만 결과에 포함됨!
 * https://github.com/typestack/class-transformer#expose-decorator 확인
 * @ApiProperty() 는 swagger 문서에만 포함됨!
 * https://docs.nestjs.com/recipes/swagger#api-property 확인
 * IsNumber, IsOptional, ... 등은 validation 을 위한 것임!
 * https://docs.nestjs.com/techniques/validation 확인
*/

export class FilterPostDto {
  @Expose()
  @IsOptional()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  @ApiProperty({ title: '제목', example: '검색어', required: false, default: '', description: '검색어' })
  title: string;

  @Expose()
  @IsString()
  @ApiProperty({ title: '내용', example: '검색어', required: false, default: '', description: '검색어' })
  content: string;
}

