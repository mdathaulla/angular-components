import { createAction, props } from "@ngrx/store";
import { AuthenticationData } from "../../../core/interfaces/authentication-data.interface";
import { LoginData } from "../../../core/interfaces/login-data.interface";

export const getAuthenticationLocal = createAction(
  "[Authentication] Get Authentication Local",
  props<{ payload: AuthenticationData }>()
);

export const login = createAction(
  "[Authentication] Login",
  props<{ payload: LoginData }>()
);

export const loginSuccess = createAction(
  "[Authentication] Login Success",
  props<{ payload: AuthenticationData }>()
);

export const loginFail = createAction(
  "[Authentication] Login Fail",
  props<{ payload: any }>()
);

export const logout = createAction("[Authentication] Logout");
export const logoutSuccess = createAction("[Authentication] Logout Success");
export const logoutFail = createAction(
  "[Authentication] Logout Fail",
  props<{ payload: any }>()
);

export type AuthenticationActions = ReturnType<
  | typeof login
  | typeof loginSuccess
  | typeof loginFail
  | typeof getAuthenticationLocal
  | typeof logout
  | typeof logoutSuccess
  | typeof logoutFail
>;
