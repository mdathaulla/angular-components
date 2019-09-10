import { TestBed, ComponentFixture } from "@angular/core/testing";
import { LoginFormComponent } from "./login-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginData } from "../../../core/interfaces/login-data.interface";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
describe("LoginFormComponent", () => {
  let component: LoginFormComponent = null;
  let fixture: ComponentFixture<LoginFormComponent> = null;
  let el: DebugElement = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it("Should initialize with login form", () => {
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.get("username")).toBeTruthy();
    expect(component.loginForm.get("password")).toBeTruthy();
  });

  it("Should emit login information", () => {
    const loginData: LoginData = {
      username: "plescanopasquet",
      password: "123456"
    };
    component.loginForm.patchValue(loginData);
    component.loginFormSubmit.subscribe((data: LoginData) =>
      expect(data).toEqual(loginData)
    );
    component.login(component.loginForm);
  });

  it("Should show a error message when username is not provided", () => {
    const message = "Please enter your username";
    el.query(By.css("input[type=text]")).triggerEventHandler("focus", null);
    fixture.detectChanges();
    el.query(By.css("input[type=text]")).triggerEventHandler("blur", null);
    fixture.detectChanges();
    expect(
      el.query(By.css(".username-error-container p")).nativeElement.textContent
    ).toMatch(message);
  });

  it("Should show a error message when password is not provided", () => {
    const message = "Please enter your password";
    el.query(By.css("input[type=password]")).triggerEventHandler("focus", null);
    fixture.detectChanges();
    el.query(By.css("input[type=password]")).triggerEventHandler("blur", null);
    fixture.detectChanges();
    expect(
      el.query(By.css(".password-error-container p")).nativeElement.textContent
    ).toMatch(message);
  });

  it("Should show disabled button if inputs have no data", () => {
    fixture.detectChanges();
    expect(el.query(By.css("button[type=submit]")).nativeElement.disabled).toBe(
      true
    );
  });

  it("Should show enable button if inputs have data", () => {
    const loginData: LoginData = {
      username: "plescanopasquet",
      password: "123456"
    };
    component.loginForm.patchValue(loginData);
    fixture.detectChanges();
    expect(el.query(By.css("button[type=submit]")).nativeElement.disabled).toBe(
      false
    );
  });
  
});
