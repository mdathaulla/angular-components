import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromAuthenticationStore from "../../../authentication/store";
import { User } from "../../../core/interfaces/user.interface";
@Component({
  selector: "angular-components-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
  user$: Observable<User> = this.store.select(
    fromAuthenticationStore.selectAuthenticationUser
  );
  constructor(
    private store: Store<fromAuthenticationStore.AuthenticationState>
  ) {}

  ngOnInit() {}
}
