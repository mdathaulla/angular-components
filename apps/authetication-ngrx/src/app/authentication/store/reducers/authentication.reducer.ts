import { createReducer, on, createFeatureSelector, State } from "@ngrx/store";
import * as fromActions from "../actions";
import { User } from "../../../core/interfaces/user.interface";
export interface AuthenticationState {
  loading: boolean;
  loaded: boolean;
  token: string;
  user: User;
}
export const initialState: AuthenticationState = {
  loading: false,
  loaded: false,
  token: null,
  user: null
};
export const reducer = createReducer(
  initialState,
  on(fromActions.login, state => ({ ...state, loading: true, loaded: false })),
  on(fromActions.loginSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    token: payload.token,
    user: payload.user
  })),
  on(fromActions.loginFail, state => ({
    ...state,
    loading: false,
    loaded: false
  })),
  on(fromActions.getAuthenticationLocal, (state, { payload }) => ({
    ...state,
    ...payload,
    loading: false,
    loaded: true
  })),
  on(fromActions.logout, state => ({ ...state, loading: true, loaded: false })),
  on(fromActions.logoutSuccess, state => ({
    ...state,
    loading: false,
    loaded: false,
    user: null,
    token: null
  })),
  on(fromActions.logoutFail, state => ({
    ...state,
    loading: false,
    loaded: true
  }))
);

export const selectAuthenticationState = createFeatureSelector<
  AuthenticationState
>("authentication");
