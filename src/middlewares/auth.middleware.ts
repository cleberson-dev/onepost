import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ClientError, { ClientErrors } from '../errors/ClientError';

export default function authMiddleware(req: Request, res: Response, next: NextFunction): any {
  // O token deve está no header de autorização da requisição
  const authValue = req.get('authorization');

  if (!authValue) {
    next(new ClientError(
      ClientErrors.TokenRequired,
      'É necessário token para conseguir acesso.'
    ));
    return;
  }

  // Precisa verificar a existência de Bearer no início do valor de autenticação
  const [firstPart, token] = authValue.split(' ');
  if (firstPart !== 'Bearer') {
    next(new ClientError(
      ClientErrors.InvalidToken,
      'Token inválido.'
    ));
  }

  // O token decodificado deve ser passado ao corpo da requisição para uso no próximo handler.
  try {
    const decoded = jwt.verify(token, process.env.SECRET + '');
    req.user = decoded as { username: string };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      next(new ClientError(
        ClientErrors.InvalidToken,
        'Token expirado/inválido. Por favor, se possível, gere outro.'
      ));
    }
  }
};
