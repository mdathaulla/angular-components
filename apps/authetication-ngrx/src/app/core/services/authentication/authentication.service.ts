import { Injectable } from "@angular/core";
import { LoginData } from "../../interfaces/login-data.interface";
import { of, Observable, timer } from "rxjs";
import { AuthenticationData } from "../../interfaces/authentication-data.interface";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "apps/authetication-ngrx/src/environments/environment";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  constructor(private http: HttpClient) {}
  login(data: LoginData): Observable<AuthenticationData> {
    // DUMMY FOR EXAMPLE TO LOGIN REMOVE FOR PRODUCTION AND TESTS
    
    // const { username, password } = data;
    // return timer(1000).pipe(
    //   map(() => {
    //     if (username === "plescanopasquet" && password === "123456") {
    //       return {
    //         token: `${Date.now()}`,
    //         user: {
    //           id: `${Date.now()}`,
    //           name: "Pedro Lescano",
    //           username: "plescanopasquet"
    //         }
    //       };
    //     }
    //     throw new Error("Username or password doesn't exist");
    //   })
    // );
    return this.http.post<AuthenticationData>(
      `${environment.API_URI}/login`,
      data
    );
  }

  logout(): Observable<boolean> {
    return of(localStorage.removeItem("authentication")).pipe(map(() => true));
  }

  saveAuthenticationLocal(data: AuthenticationData): Observable<boolean> {
    return of(
      localStorage.setItem("authentication", JSON.stringify(data))
    ).pipe(map(() => true));
  }

  getAuthenticationLocal(): Observable<AuthenticationData> {
    const authentication = localStorage.getItem("authentication");
    const data = !!authentication
      ? JSON.parse(authentication)
      : { token: null, user: null };
    return of(data);
  }
}
