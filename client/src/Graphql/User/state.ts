import { makeVar } from "@apollo/client";
import { IUser } from "../../Interfaces/IUser";
import { IAuthentication } from "../../Interfaces/IAuthentication";

export const userVar = makeVar<IUser | null>(null);
export const authenticationVar = makeVar<IAuthentication | null>(null);
// export const createTasksVar = makeVar<ICreateTask | null>(null);
// export const deleteTasksVar = makeVar<IDeleteTask | null>(null);
// export const updateTasksVar = makeVar<ICreateTask | null>(null);
