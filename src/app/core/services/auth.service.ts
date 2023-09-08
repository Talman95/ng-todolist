import { LoginData } from './../models/auth.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonResponse } from './../models/common-response.model';
import { ResultCode } from '../enums/result-code.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

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
