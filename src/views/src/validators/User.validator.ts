import isEmail from 'validator/lib/isEmail';
import isLowercase from 'validator/lib/isLowercase';
import Schema from 'validate';


const customIsEmail = (value: string): boolean => (value === '') || isEmail(value);

const usernameSchema = {
  type: String,
  required: true,
  length: { min: 4, max: 16 },
  use: { isLowercase },
  message: {
    required: 'Nome de usuário obrigatório.',
    type: 'Nome de usuário não segue o formato desejado. (FORMATO).',
    length: 'O comprimento curto/longo (mínimo: 4, máximo: 16).',
    isLowercase: 'Caracteres devem estar em letra minúscula.'
  }
}

const passwordSchema = {
  type: String,
  required: true,
  length: { min: 8 },
  message: {
    length: 'Comprimento mínimo para senha é de 8 caracteres.',
    required: 'Campo obrigatório.'
  }
};



export const loginUserValidator = new Schema({
  username: usernameSchema,
  password: passwordSchema
}); 

export const registerUserValidator = new Schema({
  username: usernameSchema,
  password: passwordSchema,
  password2: passwordSchema,
  email: {
    type: String,
    required: false,
    use: { isEmail: customIsEmail },
    message: {
      isEmail: 'Não é um e-mail válido.'
    }
  }
}); 












