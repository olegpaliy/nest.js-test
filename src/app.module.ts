import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArticleRepository } from './articleRepository.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ArticleRepository],
})
export class AppModule {}
