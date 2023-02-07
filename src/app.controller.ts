import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Article } from '@prisma/client';
import { ArticleRepository } from './articleRepository.service';

@Controller('/articles')
export class AppController {
  private incorrectIdValueError;
  constructor(private readonly articleRepository: ArticleRepository) {
    this.incorrectIdValueError = new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'parameter must be a number',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  @Get()
  async getAllArticle(): Promise<Article[]> {
    const article = await this.articleRepository.getAll();
    return article;
  }

  @Post()
  async createArticle(@Body() arcticleDto: Article): Promise<Article> {
    const article = await this.articleRepository.insert(arcticleDto);
    return article;
  }

  @Get(':id')
  async getArticle(@Param('id') id: string): Promise<Article> {
    if (Number.isNaN(+id)) {
      throw this.incorrectIdValueError;
    }
    const article = await this.articleRepository.getArticle(id);
    return article;
  }

  @Put(':id')
  async changeArticle(
    @Param('id') id: string,
    @Body() articleData: Article,
  ): Promise<Article> {
    if (Number.isNaN(+id)) {
      throw this.incorrectIdValueError;
    }
    const article = await this.articleRepository.update(
      { id: +id },
      articleData,
    );
    return article;
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string): Promise<Article> {
    if (Number.isNaN(+id)) {
      throw this.incorrectIdValueError;
    }
    const article = await this.articleRepository.delete({
      id: +id,
    });
    return article;
  }
}
