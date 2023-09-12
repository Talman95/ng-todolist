import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private toastrService: ToastrService) {}

  showError(error: string) {
    this.toastrService.error(error);
  }
}
