import { Request } from 'express';

export interface UserRequestData {
  username: string;
};

export default interface UserRequest extends Request {
  user: UserRequestData
};
