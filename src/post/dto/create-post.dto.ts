import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";

export class ConnectPostDto {
  @Expose()
  @IsNumber()
  id: number;
}
