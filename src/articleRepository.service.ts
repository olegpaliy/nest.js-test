import { Injectable } from '@nestjs/common';
import { Article, PrismaClient } from '@prisma/client';

interface IdSearch {
  id: number;
}

@Injectable()
export class ArticleRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll(): Promise<Article[]> {
    return this.prisma.article.findMany();
  }

  async insert(data: Article): Promise<Article> {
    return this.prisma.article.create({ data });
  }

  async getArticle(id: string): Promise<Article | null> {
    return this.prisma.article.findUnique({ where: { id: +id } });
  }

  async update(id: IdSearch, data: Article): Promise<Article> {
    return this.prisma.article.update({
      where: id,
      data,
    });
  }

  async delete(id: IdSearch): Promise<Article> {
    return this.prisma.article.delete({
      where: id,
    });
  }
}
