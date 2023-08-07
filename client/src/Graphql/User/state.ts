import { makeVar } from "@apollo/client";

// Interfaces
import { IUser } from "../../Interfaces/IUser";
import { IAuthentication } from "../../Interfaces/IAuthentication";
import { IResponse } from "../../Interfaces/IResponse";

export const userVar = makeVar<IUser | null>(null);
export const authenticationVar = makeVar<IAuthentication | null>(null);
export const getUserVar = makeVar<IUser | null>(null);
export const editUserVar = makeVar<IResponse | null>(null);