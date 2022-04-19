import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { RegisterRequestInterface } from './../types/registerRequest.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }

register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
  const url = environment.apiUrl + `/api/users`;
  return this.http
        .post<AuthResponseInterface>(url, data)
        .pipe(map((res: AuthResponseInterface) => res.user));
}

}
