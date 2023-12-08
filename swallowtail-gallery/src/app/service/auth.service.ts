import { User } from 'src/app/model/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient, private _router: Router) {}
  private _basedUrl: string = environment.endpoint;

  private user: User | null;
  private token: string | null;

  public login(email: string, password: string): Promise<string | User> {
    let body = {
      email: email,
      password: password,
    };
    return new Promise<string | User>((resolve, reject) => {
      this._http
        .post(this._basedUrl + 'auth/login', body, {
          responseType: 'json',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .subscribe({
          next: (data: { user: User; token: string }) => {
            this.setToken = data.token;
            this.setUser = data.user;
            resolve(data.user);
          },
          error: (error: { error: { message: string } }) => {
            reject(error.error.message);
          },
        });
    });
  }

  public register(
    name: string,
    email: string,
    password: string
  ): Observable<{ token: string; user: User }> {
    let body = {
      name: name,
      email: email,
      password: password,
    };
    return this._http.post<{ token: string; user: User }>(
      this._basedUrl + 'auth/register',
      body,
      {
        responseType: 'json',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  public authenticate(token: string) {
    return this._http.post(
      this._basedUrl + 'auth',
      {},
      {
        responseType: 'json',
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
        },
      }
    );
  }

  public logout() {
    this._http
      .post(
        this._basedUrl + 'auth/logout',
        {},
        {
          responseType: 'json',
          headers: {
            Authorization: 'Bearer ' + this.getToken,
            Accept: 'application/json',
          },
        }
      )
      .subscribe({
        next: (data: { message: string }) => {
          this.clearLoginSession();
          this._router.navigate(['login']);
        },
        error: (error: { error: { message: string } }) => {
          this.clearLoginSession();
          this._router.navigate(['login']);
        },
      });
  }

  public clearLoginSession() {
    this.user = null;
    this.token = null;
    localStorage.removeItem('token');
    this._router.navigate(['login']);
  }

  public fetchToken() {
    this.token = localStorage.getItem('token');
  }

  get getToken() {
    return this.token ?? localStorage.getItem('token');
  }

  set setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  set setUser(user: User) {
    this.user = user;
  }

  get getUser() {
    return this.user;
  }
}
