import { IsInt, IsDefined, IsString, IsOptional, IsBoolean } from "class-validator";
import { User } from "./";

export class Post {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    title!: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsBoolean()
    published?: boolean;

    @IsOptional()
    author?: User;

    @IsOptional()
    @IsInt()
    authorId?: number;
}
