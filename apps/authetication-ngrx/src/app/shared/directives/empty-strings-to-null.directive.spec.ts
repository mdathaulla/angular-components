import { TestBed, ComponentFixture } from "@angular/core/testing";
import { DebugElement, Component } from "@angular/core";
import { EmptyStringsToNullDirective } from "./empty-string-to-null.directive";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormsModule,
  NgControl,
  FormControl
} from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/compiler/src/core";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <input [formControl]="control" type="text" empty-strings-to-null />
  `
})
class TestComponent {
  control: FormControl = new FormControl(null);
}

describe("EmptyStringsToNullDirective", () => {
  let component: TestComponent = null;
  let fixture: ComponentFixture<TestComponent> = null;
  let el: DebugElement = null;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, EmptyStringsToNullDirective],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
      providers: [NgControl]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it("Should trim the value", () => {
    const directive = el.query(By.directive(EmptyStringsToNullDirective))
      .nativeElement;
    component.control.setValue("    plescanopasquet    ");
    fixture.detectChanges();
    directive.dispatchEvent(new Event("blur"));
    fixture.detectChanges();
    expect(component.control.value).toBe("plescanopasquet");
  });

  it("Should return null if a empty string was inserted", () => {
    const directive = el.query(By.directive(EmptyStringsToNullDirective))
      .nativeElement;
    component.control.setValue("");
    fixture.detectChanges();
    directive.dispatchEvent(new Event("blur"));
    fixture.detectChanges();
    expect(component.control.value).toBe(null);
  });
});
