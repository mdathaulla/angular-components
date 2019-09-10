import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class LoaderService {
  loaderSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {}
  showLoader(show: boolean) {
    this.loaderSubject$.next(show);
  }
}
