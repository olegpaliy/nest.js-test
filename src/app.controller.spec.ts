import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ArticleRepository } from './articleRepository.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ArticleRepository],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getAllArticle()).toBe([]);
    });
  });
});
