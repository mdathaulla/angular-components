import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class UtilService {
  constructor(private toastrService: ToastrService) {}
  showToast(
    message: string,
    type: "success" | "error" | "info" | "warning" = "success"
  ): void {
    this.toastrService[type](message);
  }
}
