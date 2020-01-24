import {UserModel} from './user.model';

export class MessageModel {
  event: string
  chat: string;
  message: string;
  user: UserModel;
}
