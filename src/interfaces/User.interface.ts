export default interface UserInterface {
  username: string,
  password: string,
  email: string,
  lastPost?: Date | null
};

export interface UserInputInterface extends UserInterface {
  password2: string
};

export interface UserRequestData {
  username: string;
};
