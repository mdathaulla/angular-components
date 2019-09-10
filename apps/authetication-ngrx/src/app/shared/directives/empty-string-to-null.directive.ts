import { Directive, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[empty-strings-to-null]"
})
export class EmptyStringsToNullDirective {
  constructor(private ngControl: NgControl) {}
  @HostListener("blur", ["$event"])
  onblur(ev: FocusEvent) {
    const input = <HTMLInputElement>ev.target;
    const value = input.value.trim() !== "" ? input.value.trim() : null;
    this.ngControl.control.setValue(value);
  }
}
