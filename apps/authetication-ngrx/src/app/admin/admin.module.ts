import { NgModule } from "@angular/core";
import { AdminComponent } from "./containers/admin/admin.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
const routes: Routes = [{ path: "", component: AdminComponent }];
@NgModule({
  declarations: [AdminComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class AdminModule {}
