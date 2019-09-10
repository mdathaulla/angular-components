import * as fromStore from "../../store";
import { AuthenticationData } from "../../../core/interfaces/authentication-data.interface";
import { User } from "../../../core/interfaces/user.interface";
import { LoginData } from "../../../core/interfaces/login-data.interface";
describe("Authentication Selectors", () => {
  const token = `agf11231asd`;
  const user: User = {
    id: `1`,
    name: "Pedro Benjamin Lescano Pasquet",
    username: "plescanopasquet"
  };
  const username = `plescanopasquet`;
  const password = "123456";

  describe("selectUserIsLoggedIn", () => {
    it("should return true if user is logged in", () => {
      const payload: AuthenticationData = { user, token };
      const authenticatedAction = fromStore.getAuthenticationLocal({
        payload
      });
      const authenticatedState = fromStore.reducer(
        fromStore.initialState,
        authenticatedAction
      );
      const isUsedLoggedIn = fromStore.selectIsUserloggedIn({
        authentication: authenticatedState
      });
      expect(isUsedLoggedIn).toMatchSnapshot();
    });

    it("should return false if user is not logged in", () => {
      const authenticatedAction = fromStore.getAuthenticationLocal({
        payload: { user: null, token: null }
      });
      const unAuthenticatedState = fromStore.reducer(
        fromStore.initialState,
        authenticatedAction
      );
      const isUsedLoggedIn = fromStore.selectIsUserloggedIn({
        authentication: unAuthenticatedState
      });
      expect(isUsedLoggedIn).toMatchSnapshot();
    });
  });

  describe("selectAuthenticationToken", () => {
    it("should return token if user is logged in", () => {
      const payload: AuthenticationData = { user, token };
      const authenticatedAction = fromStore.getAuthenticationLocal({
        payload
      });
      const authenticatedState = fromStore.reducer(
        fromStore.initialState,
        authenticatedAction
      );
      const authenticationToken = fromStore.selectAuthenticationToken({
        authentication: authenticatedState
      });
      expect(authenticationToken).toMatchSnapshot();
    });

    it("should return null if user is not logged in", () => {
      const authenticatedAction = fromStore.getAuthenticationLocal({
        payload: { user: null, token: null }
      });
      const unAuthenticatedState = fromStore.reducer(
        fromStore.initialState,
        authenticatedAction
      );
      const authenticationToken = fromStore.selectAuthenticationToken({
        authentication: unAuthenticatedState
      });
      expect(authenticationToken).toMatchSnapshot();
    });

  });

  describe("selectAuthenticationUser", () => {
    it("should return user model if user is logged in", () => {
      const payload: AuthenticationData = { user, token };
      const authenticatedAction = fromStore.getAuthenticationLocal({
        payload
      });
      const authenticatedState = fromStore.reducer(
        fromStore.initialState,
        authenticatedAction
      );
      const authenticationUser = fromStore.selectAuthenticationUser({
        authentication: authenticatedState
      });
      expect(authenticationUser).toMatchSnapshot();
    });

    it("should return null if user is not logged in", () => {
      const authenticatedAction = fromStore.getAuthenticationLocal({
        payload: { user: null, token: null }
      });
      const unAuthenticatedState = fromStore.reducer(
        fromStore.initialState,
        authenticatedAction
      );
      const authenticationUser = fromStore.selectAuthenticationUser({
        authentication: unAuthenticatedState
      });
      expect(authenticationUser).toMatchSnapshot();
    });

  });

  describe("selectAuthenticationLoading", () => {
    it("should return true if user is loging in", () => {
      const payload: LoginData = { username, password };
      const authenticatedAction = fromStore.login({
        payload
      });
      const authenticationState = fromStore.reducer(
        fromStore.initialState,
        authenticatedAction
      );
      const isAuthenticationLoading = fromStore.selectAuthenticationLoading({
        authentication: authenticationState
      });
      expect(isAuthenticationLoading).toMatchSnapshot();
    });

    it("should return false if user is logged in", () => {
      const payload: AuthenticationData = { user, token };
      const action = fromStore.loginSuccess({ payload });
      const authenticationState = fromStore.reducer(
        fromStore.initialState,
        action
      );

      const isAuthenticationLoading = fromStore.selectAuthenticationLoading({
        authentication: authenticationState
      });
      expect(isAuthenticationLoading).toMatchSnapshot();
    });
  });

  describe("selectAuthenticationLoaded", () => {
    it("should return true if user is login in", () => {
      const payload: AuthenticationData = { user, token };
      const action = fromStore.loginSuccess({ payload });
      const authenticationState = fromStore.reducer(
        fromStore.initialState,
        action
      );

      const isAuthenticationLoaded = fromStore.selectAuthenticationLoaded({
        authentication: authenticationState
      });
      expect(isAuthenticationLoaded).toMatchSnapshot();
    });
    
    it("should return false if user is logging in", () => {
      const payload: LoginData = { username, password };
      const authenticatedAction = fromStore.login({
        payload
      });
      const authenticationState = fromStore.reducer(
        fromStore.initialState,
        authenticatedAction
      );
      const isAuthenticationLoaded = fromStore.selectAuthenticationLoaded({
        authentication: authenticationState
      });
      expect(isAuthenticationLoaded).toMatchSnapshot();
    });
  });
});
