import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient, private _router: Router) {}
  private _basedUrl: string = environment.endpoint;

  getUserLogingIn() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUser(id: string): Observable<string> {
    let body = {
      id: id,
    };
    return this._http.post(this._basedUrl + 'getUser', body, {
      responseType: 'text',
    });
  }

  getUserProfile(id: string) {
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
    let body = {
      search: search,
    };
    return this._http.post(this._basedUrl + 'searchUser', body, {
      responseType: 'text',
      reportProgress: true,
      observe: 'events',
    });
  }

  updateUser(uid: string, name: string, password: string) {
    let body = {
      uid: uid,
      name: name,
      email: password,
    };
    return this._http.post(this._basedUrl + 'updateUser', body, {
      responseType: 'text',
      reportProgress: true,
      observe: 'events',
    });
  }

  updatePassword(password: string, oldPassword: string, uid: string) {
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
    return this._http.post(this._basedUrl + 'updateProfilePicture', formData, {
      responseType: 'text',
      reportProgress: true,
      observe: 'events',
    });
  }
}
