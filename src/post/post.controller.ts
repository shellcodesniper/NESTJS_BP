import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Delete,
  Param,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { PostService } from './post.service';
import { FilterPostDto } from './dto/filter-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { RetType } from '../common/@types/return.type';


@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<RetType<Record<string, any>>> {
    const post = await this.postService.createPost(createPostDto);

    return RetType.new<Record<string, any>>()
      .setData({ post: post })
      .setHttpStatus(HttpStatus.CREATED);

  }

  @Get()
  async paginationFind(@Query() filter: FilterPostDto): Promise<RetType<Record<string, any>>> {
    console.log(filter);
    const posts = await this.postService.posts({
      skip: filter.skip,
      take: filter.take,
      cursor: {
        id: filter.id
      },

      where: {
        AND: [
          { title: { contains: filter.title } },
          { content: { contains: filter.content } },
        ],
      }
    });

    return RetType.new<Record<string, any>>()
      .setData({ posts: posts })
      .setHttpStatus(HttpStatus.OK);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RetType<Record<string, any>>> {
    const post = await this.postService.post({
      id: +id,
    });
    
    return RetType.new<Record<string, any>>()
      .setData({ post: post })
      .setHttpStatus(HttpStatus.OK);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postService.update(+id, updatePostDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postService.remove(+id);
  // }
}
