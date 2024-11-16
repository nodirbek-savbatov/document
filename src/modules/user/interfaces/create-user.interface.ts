import { IUser } from "./user.interface";

export declare interface ICreateUserRequest extends Omit<Omit<IUser, 'id'>, 'role'> { }
export declare interface ICreateUserResponse {
    message : string;
    user : IUser
}