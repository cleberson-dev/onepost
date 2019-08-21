import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import { UserInputInterface } from '../interfaces/User.interface';
import { UserRequestData } from '../interfaces/Request.interface';
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

  if (password !== password2) throw new ValidationError(ValidationErrors.PasswordsDontMatch, 'As senhas não batem');

  const newUser = new User({ username, email, password });
  return newUser.save()
    .then((user): string => {
      const payload: UserRequestData = {
        username: user.username
      };
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: '1 day'
      });

      return token;
    });
};

function changeLastPostDate(username: string, date: Date) {
  return User.findOneAndUpdate({ username }, { $set: { lastPost: date } });
}

function getUserLastPostDate(username: string): Promise<Date> {
  return User.findOne({ username }).then(user => user.lastPost);
}

export default {
  registerUser,
  loginUser,
  changeLastPostDate,
  getUserLastPostDate
};
