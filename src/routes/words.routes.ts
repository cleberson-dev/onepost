import { Router, Request, Response, NextFunction } from 'express';
import PostController from '../controllers/Post.controller';
import WordController from '../controllers/Word.controller';

const wordsRoutes = Router();

// GET '/' -> Get top 10 words with their posts counts.
wordsRoutes.get('/', (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  return WordController.getTopTenWords()
    .then((words): Response => {
      res.status(200);
      return res.send(words);
    })
    .catch(next);
});

// GET '/:wordName' -> Get posts that include the requested word name.
wordsRoutes.get('/:wordName', (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  return WordController.getPostIdsByWord(req.params.wordName)
    .then(async (data): Promise<object> => {
      const posts = [];
      for (const postId of data.posts) {
        const post = await PostController.getPost(postId);
        posts.push(post);
      }
      return {
        word: data.word,
        posts
      };
    })
    .then((results): Response => {
      res.status(200);
      return res.json(results);
    })
    .catch(next);
});

export default wordsRoutes;
