import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";
import { LoginData } from "../../../core/interfaces/login-data.interface";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  constructor(private store: Store<fromStore.AuthenticationState>) {}

  ngOnInit() {}
  login(payload: LoginData) {
    this.store.dispatch(fromStore.login({ payload }));
  }
}
