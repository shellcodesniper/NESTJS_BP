import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  IsBoolean,
  // IsNumber,
  IsOptional, IsString,
} from "class-validator";

/* NOTE:
 * @Expose() 를 붙인 것만 결과에 포함됨!
 * https://github.com/typestack/class-transformer#expose-decorator 확인
 * @ApiProperty() 는 swagger 문서에만 포함됨!
 * https://docs.nestjs.com/recipes/swagger#api-property 확인
 * IsNumber, IsOptional, ... 등은 validation 을 위한 것임!
 * https://docs.nestjs.com/techniques/validation 확인
*/


export class CreatePostDto {
  @ApiProperty()
  @Expose()
  @IsString()
  title: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  content: string  | null;

  @ApiProperty()
  @Expose()
  @IsBoolean()
  @IsOptional()
  published: boolean  | null;
  
  // @ApiProperty()
  // @Expose()
  // @IsNumber()
  // authorId?: number | null;

}

