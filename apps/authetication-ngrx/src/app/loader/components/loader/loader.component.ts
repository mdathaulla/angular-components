import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { LoaderService } from "../../services/loader.service";
import { Observable } from "rxjs";
import { ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-loader",
  styleUrls: ["loader.component.scss"],
  template: `
    <div *ngIf="(show$ | async) as show">
      <div *ngIf="show" class="loader-overlay">
        <div class="loader-container">
          <div class="loader"></div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {
  show$: Observable<boolean> = this.loaderService.loaderSubject$;
  constructor(private loaderService: LoaderService) {}
  ngOnInit() {}
}
