import { Document, Schema, model } from 'mongoose';
import UserInterface from '../interfaces/User.interface';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 4,
    maxlength: 16
  },
  name: {
    type: String,
    minlength: 4,
    maxlength: 32
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

// Função para validar espaços em branco
UserSchema.path('username').validate(
  (value): boolean => !/\s/.test(value),
  'Não é permitido espaços em branco.'
);

export interface UserModel extends UserInterface, Document { };
export default model<UserModel>('User', UserSchema);
