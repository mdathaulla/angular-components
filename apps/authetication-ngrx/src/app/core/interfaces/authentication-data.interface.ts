import { User } from "./user.interface";
export interface AuthenticationData {
  token: string;
  user: User;
}
