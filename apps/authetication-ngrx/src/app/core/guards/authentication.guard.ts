import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { take, map } from "rxjs/operators";
import * as fromStore from "../../authentication/store";

@Injectable({ providedIn: "root" })
export class AuthenticationGuard implements CanActivate {
  constructor(
    private store: Store<fromStore.AuthenticationState>,
    private router: Router
  ) {}

  canActivate() {
    return this.store.select(fromStore.selectIsUserloggedIn).pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          return true;
        } else {
          this.router.navigate(["/login"]);
          return false;
        }
      })
    );
  }
}
