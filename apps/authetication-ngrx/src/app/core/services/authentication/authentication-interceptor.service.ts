import { Injectable } from "@angular/core";

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";

import { Store } from "@ngrx/store";

import { AuthenticationState } from "../../../authentication/store";
import * as fromAuthenticationStore from "../../../authentication/store";
import { mergeMap, catchError, map, withLatestFrom } from "rxjs/operators";
import { of } from "rxjs";
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private store: Store<AuthenticationState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return of(req).pipe(
      withLatestFrom(
        this.store.select(fromAuthenticationStore.selectAuthenticationToken)
      ),
      map(([request, token]) =>
        request.clone({
          headers: req.headers.set("Authorization", !!token ? token : "")
        })
      ),
      mergeMap(authenticatedRequest =>
        next
          .handle(authenticatedRequest)
          .pipe(catchError(err => this.unautorizedHandler(err)))
      )
    );
  }
  unautorizedHandler(err) {
    if (err && err.status && err.status === 401) {
      return of(this.store.dispatch(fromAuthenticationStore.logout()));
    }
    return of(err);
  }
}
