import { IUser, IUserEmail, IUserName } from "../../types/interface";

export const user = (state: any) => state.user?.data as IUser;
export const check = (state: any) => state.user.isAuthCheck as boolean;
export const passcodeForgot = (state: any) =>
  state.user.passwordForgot as boolean;
export const profileName = (state: any) => state.user.data.name as IUserName;
export const profileEmail = (state: any) => state.user.data.email as IUserEmail;