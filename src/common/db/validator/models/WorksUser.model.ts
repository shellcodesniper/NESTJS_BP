import { IsString, IsDefined } from "class-validator";
import "./";

export class WorksUser {
    @IsDefined()
    @IsString()
    userId!: string;
}
