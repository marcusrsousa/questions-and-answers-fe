import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { LoginService } from '../../services/login.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { DialogSingupComponent } from '../dialog-singup/dialog-singup.component';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.sass']
})
export class DialogLoginComponent implements OnInit, OnDestroy {

  loginSubscription: Subscription | null = null;

  loginForm: FormGroup;

  constructor(private loginService: LoginService, private snarckBarService: SnackBarService, private matDialog: MatDialog, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  signIn(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loginSubscription = this.loginService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe({
      complete: () => this.matDialog.closeAll(),
      error: () => this.snarckBarService.open('email or password is incorrect!')
    });
  }

  signUp(): void {
    this.matDialog.open(DialogSingupComponent, {
      width: '400px'
    });
  }

}
