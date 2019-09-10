import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginData } from "../../../core/interfaces/login-data.interface";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup = this.getLoginForm();
  @Output()
  loginFormSubmit: EventEmitter<LoginData> = new EventEmitter();
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  private getLoginForm(): FormGroup {
    return this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
  login({ value }: FormGroup): void {
    this.loginFormSubmit.emit(value);
  }
  get usernameControl() {
    return this.loginForm.get("username");
  }
  get passwordControl() {
    return this.loginForm.get("password");
  }
}
