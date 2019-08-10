import { Document, Schema, model } from 'mongoose';
import { isEmail } from 'validator';
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
    minlength: 8,
    maxlength: 16
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

export interface UserModel extends UserInterface, Document { };
export default model<UserModel>('User', UserSchema);
