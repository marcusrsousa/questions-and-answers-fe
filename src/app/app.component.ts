import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPasswordComponent } from './shared/components/dialog-password/dialog-password.component';
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

  constructor(private loginService: LoginService, public dialog: MatDialog) {
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

  changePassword() {
    this.dialog.open(DialogPasswordComponent, { width: '400px' });
  }
}
