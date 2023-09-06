import { AuthService } from 'src/app/core/services/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';

@Component({
  selector: 'tl-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn!: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn$;
  }

  logout() {
    this.authService.logout();
  }
}
