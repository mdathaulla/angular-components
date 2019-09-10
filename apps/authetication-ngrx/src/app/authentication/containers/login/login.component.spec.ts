import { TestBed, ComponentFixture } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { NO_ERRORS_SCHEMA, DebugElement } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { By } from "@angular/platform-browser";
describe("LoginComponent", () => {
  let component: LoginComponent = null;
  let fixture: ComponentFixture<LoginComponent> = null;
  let el: DebugElement = null;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [StoreModule.forRoot({})]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it("Should have login form component", () =>
    expect(el.query(By.css("app-login-form")).nativeElement).toBeTruthy());
});
