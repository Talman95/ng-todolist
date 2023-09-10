import { AuthService } from 'src/app/core/services/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'tl-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isLoading$ = this.loadingService.isLoading$;
  }

  logout() {
    this.authService.logout();
  }
}
