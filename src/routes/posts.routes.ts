import { Router, Request, Response, NextFunction } from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import PostController from '../controllers/Post.controller';
import UserController from '../controllers/User.controller';
import WordController from '../controllers/Word.controller';
import UserRequest from '../interfaces/Request.interface';
import ClientError, { ClientErrors } from '../errors/ClientError';

const postsRoutes = Router();

// GET '/' -> Get limited number of posts sorted by publication date.
postsRoutes.get('/', (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const ammount = req.body.ammount || 20;
  const start = req.body.start || 0;

  return PostController.getPosts(ammount, start)
    .then((posts): Response => {
      res.status(200);
      return res.send(posts);
    })
    .catch(next);
});

// POST '/' -> Create new post
postsRoutes.post('/', authMiddleware, async (req: UserRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  const { content } = req.body;
  const { user } = req;

  try {
    const userLastPostDate = await UserController.getUserLastPostDate(user.username);
    const post = await PostController.createPost(content, { username: user.username, lastPost: userLastPostDate })
    await WordController.addPostReferences(post);
    await UserController.changeLastPostDate(user.username, post.pubDate);

    res.status(200);
    return res.send(post);
  } catch (err) {
    next(err);
  }
});

// PATCH '/:postId' -> Update some existing post (Options: 'like')
postsRoutes.patch('/:postId', authMiddleware, async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
  const { postId } = req.params || '';
  const { user } = req;

  switch (req.body.type) {
    case 'like':
      PostController.likePost(postId, user.username)
        .then((data): void => {
          res.status(200);
          res.send({ success: true });
          next();
        })
        .catch(next);
      break;
    default:
      next(new ClientError(
        ClientErrors.MalformedRequest,
        'Deve informar o tipo de alteração no corpo da requisição.'
      ));
  }
});

// DELETE '/:postId' -> Delete a user's post.
postsRoutes.delete('/:postId', authMiddleware, async (req: UserRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  const { postId } = req.params;
  const { user } = req;

  try {
    const post = await PostController.deletePost(postId, user.username);

    // As referências do post na coleção de palavras devem ser removidas.
    await WordController.removePostReferences(post);

    res.status(200);
    return res.send(post);
  } catch (err) {
    next(err);
  }
});

export default postsRoutes;
