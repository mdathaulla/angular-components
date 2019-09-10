import { async } from "@angular/core/testing";
import { AuthenticationService } from "./authentication.service";
import { of } from "rxjs";
import { AuthenticationData } from "../../interfaces/authentication-data.interface";
import { LoginData } from "../../interfaces/login-data.interface";
import { environment } from "apps/authetication-ngrx/src/environments/environment";

const authenticationData: AuthenticationData = {
  token: `${Date.now()}`,
  user: { id: `${Date.now()}`, name: "Pedro", username: "plescanopasquet" }
};
const apiResponse = { success: true, data: authenticationData };
describe("AuthenticationService", () => {
  let httpMock: any = null;
  let service: AuthenticationService = null;

  beforeEach(() => {
    httpMock = { post: jest.fn(() => of(apiResponse)) };
    service = new AuthenticationService(httpMock as any);
  });

  it("Should return authentication data", async(() => {
    const loginData: LoginData = {
      username: "plescanopasquet",
      password: "123456"
    };

    service.login(loginData).subscribe((response: any) => {
      expect(httpMock.post).toHaveBeenCalledWith(
        `${environment.API_URI}/login`,
        loginData
      );
      expect(response).toEqual(apiResponse);
    });
  }));

  it("Should remove localstorage authentication data", async(() => {
    service.logout().subscribe((response: any) => {
      const data = localStorage.getItem("authentication");
      expect(data).toBe(null);
      expect(response).toBe(true);
    });
  }));

  it("Should save authentication data in localstorage", async(() => {
    service
      .saveAuthenticationLocal(authenticationData)
      .subscribe((response: any) => {
        const data = localStorage.getItem("authentication");
        expect(JSON.parse(data)).toEqual(authenticationData);
        expect(response).toBe(true);
      });
  }));

  it("Should get authentication data from localstorage", async(() => {
    service.getAuthenticationLocal().subscribe((response: any) => {
      expect(response).toEqual(authenticationData);
    });
  }));
});
