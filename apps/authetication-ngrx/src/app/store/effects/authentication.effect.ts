import { Injectable } from "@angular/core";
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT
} from "@ngrx/effects";
import { AuthenticationService } from "../../core/services/authentication/authentication.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthenticationState } from "../../authentication/store";
import { LoaderService } from "../../loader/services/loader.service";
import { UtilService } from "../../core/services/util/util.service";
import { exhaustMap, map, catchError, tap, mergeMap } from "rxjs/operators";
import { AuthenticationData } from "../../core/interfaces/authentication-data.interface";
import { LoginData } from "../../core/interfaces/login-data.interface";
import { of } from "rxjs";
import * as fromAuthenticationStore from "../../authentication/store";
@Injectable()
export class AuthenticationEffect {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store<AuthenticationState>,
    private loaderService: LoaderService,
    private utilService: UtilService
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      exhaustMap(() =>
        this.authenticationService
          .getAuthenticationLocal()
          .pipe(
            map((payload: AuthenticationData) =>
              fromAuthenticationStore.getAuthenticationLocal({ payload })
            )
          )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthenticationStore.login.type),
      exhaustMap(({ payload }: { payload: LoginData }) =>
        this.authenticationService.login(payload).pipe(
          map(data =>
            fromAuthenticationStore.loginSuccess({
              payload: data
            })
          ),
          catchError(err =>
            of(fromAuthenticationStore.loginFail({ payload: err }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthenticationStore.loginSuccess.type),
        exhaustMap(({ payload }: { payload: AuthenticationData }) =>
          this.authenticationService
            .saveAuthenticationLocal(payload)
            .pipe(map(() => this.router.navigate(["/"])))
        )
      ),
    { dispatch: false }
  );

  loginFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthenticationStore.loginFail.type),
        map(({ payload }: { payload: Error }) =>
          this.utilService.showToast(payload.message, "error")
        )
      ),
    { dispatch: false }
  );

  loadingLogin$ = createEffect(
    () =>
      this.store
        .select(fromAuthenticationStore.selectAuthenticationLoading)
        .pipe(tap(isLoading => this.loaderService.showLoader(isLoading))),
    { dispatch: false }
  );

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthenticationStore.logout.type),
      mergeMap(() =>
        this.authenticationService.logout().pipe(
          map(() => fromAuthenticationStore.logoutSuccess()),
          catchError(err =>
            of(fromAuthenticationStore.logoutFail({ payload: err }))
          )
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthenticationStore.logoutSuccess.type),
        exhaustMap(() => this.router.navigate(["/login"]))
      ),
    { dispatch: false }
  );

  logoutFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthenticationStore.logoutFail.type),
        tap(({ payload }: { payload: any }) =>
          this.utilService.showToast(payload.message, "error")
        )
      ),
    { dispatch: false }
  );
}
