import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

type User = {
  name: string;
  email: string;
};

@Injectable({ providedIn: 'root' })
export class ConfigService {
  baseURL: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  requestSign(user: User): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(user);
    console.log(body);
    return this.http.post(this.baseURL + 'sign', body, { headers: headers });
  }
}
