import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient, private _router: Router) {}
  private _basedUrl: string = environment.serverUrl;

  //login using http get request methods to localhost:login.php
  public login(email: string, password: string) {
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
    };
    let body = {
      email: email,
      password: password,
    };
    return this._http.post(this._basedUrl + 'login', body, {
      responseType: 'text',
    });
  }

  public signup(username: string, email: string, password: string) {
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
    };
    let body = {
      username: username,
      email: email,
      password: password,
    };
    console.log(body);
    return this._http.post(this._basedUrl + 'signup.php', body, {
      responseType: 'text',
    });
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  logOut() {
    localStorage.removeItem('user');
    this._router.navigate(['login']);
  }

  getUserLogingIn() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUser(id: string): Observable<string> {
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
    };
    let body = {
      id: id,
    };
    return this._http.post(this._basedUrl + 'getUser', body, {
      responseType: 'text',
    });
  }

  getUserProfile(id: string) {
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
    };
    let body = {
      id: id,
    };
    return this._http.post(this._basedUrl + 'getUserProfile', body, {
      responseType: 'text',
      reportProgress: true,
      observe: 'events',
    });
  }

  getHeartedPosts(heart: string[]) {
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
    };
    let body = {
      heart: heart,
    };
    return this._http.post(this._basedUrl + 'getHeartedPosts', body, {
      responseType: 'text',
      reportProgress: true,
      observe: 'events',
    });
  }

  getUserPosts(id: string) {
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
    };
    let body = {
      id: id,
    };
    return this._http.post(this._basedUrl + 'getUserPosts', body, {
      responseType: 'text',
      reportProgress: true,
      observe: 'events',
    });
  }
  getUserPostsPublicPosts(id: string): Observable<HttpEvent<string>> {
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
    };
    let body = {
      id: id,
    };
    return this._http.post(this._basedUrl + 'getUserPostsPublicPosts', body, {
      responseType: 'text',
      reportProgress: true,
      observe: 'events',
    });
  }

  searchUser(search: string) {
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
    };
    let body = {
      search: search,
    };
    return this._http.post(this._basedUrl + 'searchUser', body, {
      responseType: 'text',
      reportProgress: true,
      observe: 'events',
    });
  }

  updateUser(uid: string, username: string, password: string) {
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
    };
    let body = {
      uid: uid,
      username: username,
      email: password,
    };
    return this._http.post(this._basedUrl + 'updateUser', body, {
      responseType: 'text',
      reportProgress: true,
      observe: 'events',
    });
  }

  updatePassword(password: string, oldPassword: string, uid: string) {
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
    };
    let body = {
      password: password,
      oldPassword: oldPassword,
      uid: uid,
    };
    return this._http.post(this._basedUrl + 'updatePassword', body, {
      responseType: 'text',
      reportProgress: true,
      observe: 'events',
    });
  }

  updateProfilePicture(formData: FormData) {
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
    };
    return this._http.post(this._basedUrl + 'updateProfilePicture', formData, {
      responseType: 'text',
      reportProgress: true,
      observe: 'events',
    });
  }
}
