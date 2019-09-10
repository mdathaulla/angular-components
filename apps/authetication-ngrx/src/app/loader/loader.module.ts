import { NgModule } from "@angular/core";
import { LoaderService } from "./services/loader.service";
import { LoaderComponent } from "./components/loader/loader.component";
import { CommonModule } from "@angular/common";
import { ModuleWithProviders } from "@angular/compiler/src/core";

@NgModule({
  declarations: [LoaderComponent],
  exports: [LoaderComponent],
  imports: [CommonModule]
})
export class LoaderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LoaderModule,
      providers: [LoaderService]
    };
  }
}
