import { ActionReducerMap } from "@ngrx/store";
import * as fromAuthentication from "../../authentication/store";
export interface State {
  authentication: fromAuthentication.AuthenticationState;
}

export const reducers: ActionReducerMap<State> = {
  authentication: fromAuthentication.reducer
};


