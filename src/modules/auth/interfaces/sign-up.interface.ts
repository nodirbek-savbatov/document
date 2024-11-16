import { ISignInRequest } from "./sign-in.interface";

export declare interface ISignUpRequest extends  ISignInRequest {
    full_name:string;
}