import { makeVar } from "@apollo/client";
import { IUser } from "../../Interfaces/IUser";
import { IAuthentication } from "../../Interfaces/IAuthentication";

export const userVar = makeVar<IUser | null>(null);
export const authenticationVar = makeVar<IAuthentication | null>(null);
