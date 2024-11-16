import { UserRoles } from "../enums";

export declare interface IUser {
    id: number;
    full_name: string;
    email: string;
    password: string;
    role: UserRoles;
}