import { Component } from '@angular/core';
import { LoginService } from './shared/services/login.service';
import { User } from './user/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'questions-and-answers';
  user: User | null = null;

  constructor(private loginService: LoginService) {
    this.loginService.isTokenValid().subscribe(isTokenValid => {
      if (!isTokenValid) {
        this.user = null;
      }
      const decoded = loginService.decodeToken();
      if (decoded) {
        this.user = decoded.user;
      }
    });
  }

  logout() {
    this.loginService.logout();
  }
}
