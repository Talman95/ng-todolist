import { MeResponse, LoginData } from './../models/auth.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonResponse } from './../models/common-response.model';
import { ResultCode } from '../enums/result-code.enum';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  private isAuth = new BehaviorSubject(false);
  isAuth$ = this.isAuth.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  me(): Observable<boolean | UrlTree> {
    return this.http
      .get<CommonResponse<MeResponse>>(`${environment.baseUrl}/auth/me`)
      .pipe(map(res => res.resultCode === ResultCode.success))
      .pipe(tap(isAuth => this.isAuth.next(isAuth)))
      .pipe(tap(isAuth => this.isLoggedIn.next(isAuth)))
      .pipe(map(isAuth => isAuth || this.router.createUrlTree(['/login'])));
  }

  login(loginData: LoginData) {
    this.http
      .post<CommonResponse<{ userId: number }>>(`${environment.baseUrl}/auth/login`, {
        ...loginData,
      })
      .subscribe(res => {
        if (res.resultCode === ResultCode.success) {
          this.isLoggedIn.next(true);
          this.router.navigate(['/todos']);
        }
      });
  }

  logout() {
    this.http.delete<CommonResponse>(`${environment.baseUrl}/auth/login`).subscribe(res => {
      if (res.resultCode === ResultCode.success) {
        this.isLoggedIn.next(false);
        this.router.navigate(['/login']);
      }
    });
  }
}
