import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading = new BehaviorSubject(false);
  isLoading$ = this.isLoading.asObservable();

  showLoading() {
    this.isLoading.next(true);
  }

  hideLoading() {
    this.isLoading.next(false);
  }
}
