import { environment } from "../../environments/environment";
import { ErrorHandler, NgModule, ModuleWithProviders } from "@angular/core";
import { ToastrModule } from "ngx-toastr";
import bugsnag from "@bugsnag/js";
import { BugsnagErrorHandler } from "@bugsnag/plugin-angular";
const providers = environment.production
  ? [
      {
        provide: ErrorHandler,
        useFactory: () => {
          return new BugsnagErrorHandler(bugsnag(environment.BUGSNAG_KEY));
        }
      }
    ]
  : [];

@NgModule({
  imports: [ToastrModule.forRoot()],
  exports: [ToastrModule],
  declarations: []
})
export class CoreModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers
    };
  }
}
