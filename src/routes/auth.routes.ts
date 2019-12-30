import { Router, Request, Response, NextFunction } from 'express';
import UserController from '../controllers/User.controller';

const authRoutes = Router();

// POST '/register' -> Create a new user and generate token.
authRoutes.post('/register', (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { username, email, password, password2 } = req.body;

  return UserController.registerUser({ username, email, password, password2 })
    .then((token): Response => {
      res.status(200);
      return res.json({ success: true, token, user: { username } });
    })
    .catch(next);
});

// POST '/login' -> Authenticate user and generate token.
authRoutes.post('/login', (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { username, password } = req.body;

  return UserController.loginUser(username, password)
    .then((token): Response => {
      res.status(200);
      return res.json({ success: true, token, user: { username } });
    })
    .catch(next);
});

export default authRoutes;
