import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Post } from '../model/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  constructor(private _http: HttpClient, private _authService: AuthService) {}

  private _basedUrl: string = environment.endpoint;

  // upload form to php server with file upload use get request method
  public upload(formData: FormData) {
    return this._http.post<{ status: string; data: Post }>(
      this._basedUrl + 'posts/upload',
      formData,
      {
        responseType: 'json',
        reportProgress: true,
        observe: 'events',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + this._authService.getToken,
        },
      }
    );
  }

  public getAllPublicPictures(): Observable<any> {
    return this._http.get<{ status: string; data: Post[] }>(
      this._basedUrl + 'posts',
      {
        responseType: 'json',
        reportProgress: true,
        observe: 'events',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + this._authService.getToken,
        },
      }
    );
  }

  public getPost(id: string) {
    let body = {
      id: id,
    };
    return this._http.post(this._basedUrl + 'getPost', body, {
      responseType: 'text',
      reportProgress: true,
      observe: 'events',
    });
  }

  public getPostEdit(id: string) {
    let body = {
      id: id,
    };
    return this._http.post(this._basedUrl + 'getPost', body, {
      responseType: 'text',
    });
  }

  setPostHearted(uid: string, hearted: string) {
    let body = {
      uid: uid,
      hearted: hearted,
    };
    return this._http.post(this._basedUrl + 'setHeartPost', body, {
      responseType: 'text',
    });
  }

  editPost(formData: FormData) {
    return this._http.post(this._basedUrl + 'editPost', formData, {
      responseType: 'text',
      reportProgress: true,
      observe: 'events',
    });
  }
  searchPost(search: string) {
    let body = {
      search: search,
    };
    return this._http.post(this._basedUrl + 'searchPost', body, {
      responseType: 'text',
      reportProgress: true,
      observe: 'events',
    });
  }
}
