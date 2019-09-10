import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./containers/login/login.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  }
];
@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [SharedModule, RouterModule.forChild(routes), ReactiveFormsModule],
  providers: []
})
export class AuthenticationModule {}
