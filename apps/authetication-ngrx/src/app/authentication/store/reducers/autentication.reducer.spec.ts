import * as fromStore from "../../store";
import { AuthenticationData } from "../../../core/interfaces/authentication-data.interface";
import { User } from "../../../core/interfaces/user.interface";

describe("Authentication reducer", () => {
  it("should return initial state when its initalized", () => {
    const action = { type: "@@init" };
    const state = fromStore.reducer(undefined, action);
    expect(state).toBe(fromStore.initialState);
  });
  it("should load user and token when api is successfull login", () => {
    const token = `agf11231asd`;
    const user: User = {
      id: `1`,
      name: "Pedro Benjamin Lescano Pasquet",
      username: "plescanopasquet"
    };
    const payload: AuthenticationData = { user, token };
    const action = fromStore.loginSuccess({ payload });
    const state = fromStore.reducer(fromStore.initialState, action);
    expect(state).toMatchSnapshot();
  });
  it("should load user and token if exist in local", () => {
    const token = `agf11231asd`;
    const user: User = {
      id: `1`,
      name: "Pedro Benjamin Lescano Pasquet",
      username: "plescanopasquet"
    };
    const payload: AuthenticationData = { user, token };
    const action = fromStore.getAuthenticationLocal({ payload });
    const state = fromStore.reducer(fromStore.initialState, action);
    expect(state).toMatchSnapshot();
  });

  it("should clean user and token if logout success", () => {
    const token = `agf11231asd`;
    const user: User = {
      id: `1`,
      name: "Pedro Benjamin Lescano Pasquet",
      username: "plescanopasquet"
    };
    const payload: AuthenticationData = { user, token };
    const authenticatedAction = fromStore.getAuthenticationLocal({ payload });
    const authenticatedState = fromStore.reducer(
      fromStore.initialState,
      authenticatedAction
    );
    const logoutAction = fromStore.logoutSuccess();
    const state = fromStore.reducer(authenticatedState, logoutAction);
    expect(state).toMatchSnapshot();
  });
});
