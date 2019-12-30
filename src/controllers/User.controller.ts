import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import { UserInputInterface, UserRequestData } from '../interfaces/User.interface';
import ValidationError, { ValidationErrors } from '../errors/ValidationError';

function loginUser(username: string, password: string): Promise<string> {
  return User.findOne({ username })
    .then((user): string => {
      if (!user) {
        throw new ValidationError(
          ValidationErrors.IncorrectUsernamePassword,
          [{ name: 'username', message: 'Nome de usuário incorreto.' }]
        );
      }
      if (!user.isValidPassword(password)) {
        throw new ValidationError(
          ValidationErrors.IncorrectUsernamePassword,
          [{ name: 'password', message: 'Senha incorreta.' }]
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
    }).catch((err) => {
      const fieldErrors = Object.entries(err.errors).map(([errKey, errObj]) => (
        { name: errKey, message: errObj.message }
      ));

      throw new ValidationError(ValidationErrors.ValidationError, fieldErrors);
    });;
};

function registerUser(userInput: UserInputInterface): Promise<string> {
  const { username, email, password, password2 } = userInput;

  if (password !== password2) {
    throw new ValidationError(
      ValidationErrors.PasswordsDontMatch,
      [{ name: 'password2', message: 'Senha inválida.' }]
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
    }).catch((err) => {
      const fieldErrors = Object.entries(err.errors).map(([errKey, errObj]) => (
        { name: errKey, message: errObj.message }
      ));

      throw new ValidationError(ValidationErrors.ValidationError, fieldErrors);
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
