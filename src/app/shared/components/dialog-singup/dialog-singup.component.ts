import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { LoginService } from '../../services/login.service';
import { SnackBarService } from '../../services/snack-bar.service';
import Validation from '../../validation';

@Component({
  selector: 'app-dialog-singup',
  templateUrl: './dialog-singup.component.html',
  styleUrls: ['./dialog-singup.component.sass']
})
export class DialogSingupComponent implements OnInit, OnDestroy {

  loginSubscription: Subscription | null = null;

  signupForm: FormGroup;

  constructor(private loginService: LoginService, private snarckBarService: SnackBarService, private matDialog: MatDialog, private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    },
    {
      validators: [Validation.match('password', 'confirm_password')]
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  signUp(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.loginSubscription = this.loginService.signup(this.signupForm.get('name')?.value, this.signupForm.get('email')?.value, this.signupForm.get('password')?.value).subscribe({
      complete: () => this.matDialog.closeAll(),
      error: err => this.snarckBarService.open(err)
    });
  }

}
