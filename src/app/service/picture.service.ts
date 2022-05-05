import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  constructor(private _http: HttpClient, private _userService: UserService) {}

  private _basedUrl: string = environment.serverUrl;

  // upload form to php server with file upload use get request method
  public upload(formData: FormData) {
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
    };

    return this._http.post(this._basedUrl + 'upload', formData, {
      responseType: 'text',
    });
  }

  public getAllPublicPictures() {
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
    };

    return this._http.get(this._basedUrl + 'getAllPublicPost', {
      responseType: 'text',
    });
  }

  public getPost(id: string) {
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
    return this._http.post(this._basedUrl + 'getPost', body, {
      responseType: 'text',
    });
  }

  setPostHearted(uid: string, hearted: string) {
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
      hearted: hearted,
    };
    console.log(body);
    return this._http.post(this._basedUrl + 'setHeartPost', body, {
      responseType: 'text',
    });
  }

  editPost(formData: FormData) {
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
    };

    return this._http.post(this._basedUrl + 'editPost', formData, {
      responseType: 'text',
    });
  }
  searchPost(search: string) {
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
    return this._http.post(this._basedUrl + 'searchPost', body, {
      responseType: 'text',
    });
  }
}
