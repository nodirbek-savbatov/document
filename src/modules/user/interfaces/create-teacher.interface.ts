import { IUser } from "./user.interface";

export declare interface ICreateTeacherRequest extends Omit<IUser, 'id'> { }
export declare interface ICreateTeacherResponse {
    message : string;
    user : IUser
}