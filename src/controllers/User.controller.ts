import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import { UserInputInterface, UserRequestData } from '../interfaces/User.interface';
import ClientError, { ClientErrors } from '../errors/ClientError';
import ValidationError, { ValidationErrors } from '../errors/ValidationError';

function loginUser(username: string, password: string): Promise<string> {
  return User.findOne({ username })
    .then((user): string => {
      if (!user || !user.isValidPassword(password)) {
        throw new ClientError(
          ClientErrors.InvalidUsernamePassword,
          'Nome de usuário/Senha inválido.'
        );
      }

      if (!process.env.SECRET) throw new Error('Erro interno');

      const payload: UserRequestData = {
        username: user.username
      };
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '1 day'
      });
      return token;
    });
};

function registerUser(userInput: UserInputInterface): Promise<string> {
  const { username, email, password, password2 } = userInput;

  if (password !== password2) {
    throw new ValidationError(
      ValidationErrors.PasswordsDontMatch,
      'As senhas não batem'
    );
  }

  const newUser = new User({ username, email, password });
  return newUser.save()
    .then((user): string => {
      if (!process.env.SECRET) throw new Error('Erro interno');

      const payload: UserRequestData = {
        username: user.username
      };
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '1 day'
      });

      return token;
    });
};

function changeLastPostDate(username: string, date: Date): Promise<{ ok: boolean }> {
  return User
    .findOneAndUpdate({ username }, { $set: { lastPost: date } })
    .then((user): { ok: boolean } => {
      if (!user) throw new Error('Usuário não encontrado');

      return { ok: true };
    });
}

function getUserLastPostDate(username: string): Promise<Date | null> {
  return User.findOne({ username }).then((user): Date | null => {
    if (!user) throw new Error('Usuário não encontrado');

    return user.lastPost || null;
  });
}

export default {
  registerUser,
  loginUser,
  changeLastPostDate,
  getUserLastPostDate
};
