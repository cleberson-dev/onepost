export default interface UserInterface {
  username: string,
  password: string,
  email: string,
  lastPost?: Date
};

export interface UserInputInterface extends UserInterface {
  password2: string
};
