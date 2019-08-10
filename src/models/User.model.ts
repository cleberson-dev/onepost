import { Document, Schema, model } from 'mongoose';
import { isEmail } from 'validator';
import bcrypt from 'bcrypt';
import UserInterface from '../interfaces/User.interface';
import { hasWhitespace, hasNonLatinCharacter } from '../utils';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 4,
    maxlength: 16
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  email: {
    type: String,
    unique: true
  }
});

// Validar espaços em branco no campo do username
UserSchema.path('username').validate(
  (value): boolean => !hasWhitespace(value),
  'Não é permitido espaços em branco.'
);

// Validar letras, números e underscores
UserSchema.path('username').validate(
  (value): boolean => !hasNonLatinCharacter(value),
  'Somente é permitido letras, números e underscores (_).'
);

// Validador para o campo email
UserSchema.path('email').validate(
  (value): boolean => isEmail(value),
  'Não é um email válido.'
);

// Gerar hash para senha antes de salvar na DB
UserSchema.pre('save', async (next): Promise<void> => {
  bcrypt.hash(this.password, 16.5)
    .then((hash): void => {
      this.password = hash;
      next();
    })
    .catch((err): void => {
      next(err);
    });
});

export interface UserModel extends UserInterface, Document { };
export default model<UserModel>('User', UserSchema);
