import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppComponent } from "./app.component";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationGuard } from "./core/guards/authentication.guard";
import { CoreModule } from "./core/core.module";
import { StoreModule } from "@ngrx/store";
import { HttpClientModule } from "@angular/common/http";
import { reducers, effects } from "./store";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { LoaderModule } from "./loader/loader.module";
const routes: Routes = [
  {
    canActivate: [AuthenticationGuard],
    path: "",
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)
  },
  {
    path: "login",
    loadChildren: () =>
      import("./authentication/authentication.module").then(
        m => m.AuthenticationModule
      )
  }
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CoreModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers: [],
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot(effects),
    LoaderModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
