import { IUser } from "./user.interface";

export declare interface IUpdateUserRequest extends Partial<Omit<IUser, 'email'>> { }