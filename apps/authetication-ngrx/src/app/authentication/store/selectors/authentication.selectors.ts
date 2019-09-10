import { createSelector } from "@ngrx/store";
import * as fromReducer from "../reducers";
export const selectIsUserloggedIn = createSelector(
  fromReducer.selectAuthenticationState,
  (state: fromReducer.AuthenticationState) => !!state.user && !!state.token
);

export const selectAuthenticationToken = createSelector(
  fromReducer.selectAuthenticationState,
  state => state.token
);

export const selectAuthenticationUser = createSelector(
  fromReducer.selectAuthenticationState,
  state => state.user
);

export const selectAuthenticationLoading = createSelector(
  fromReducer.selectAuthenticationState,
  state => state.loading
);

export const selectAuthenticationLoaded = createSelector(
  fromReducer.selectAuthenticationState,
  state => state.loaded
);

