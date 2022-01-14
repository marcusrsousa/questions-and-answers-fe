import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../services/login.service';
import { SnackBarService } from '../../services/snack-bar.service';
import Validation from '../../validation';

@Component({
  selector: 'app-dialog-password',
  templateUrl: './dialog-password.component.html',
  styleUrls: ['./dialog-password.component.sass']
})
export class DialogPasswordComponent implements OnInit {

  passwordForm: FormGroup;
  
  constructor(private fb: FormBuilder, private loginService: LoginService, private matDialog: MatDialog, private snackBarService: SnackBarService) { 
    this.passwordForm = this.fb.group({
      current_password: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    },
    {
      validators: [Validation.match('password', 'confirm_password'), Validation.notmatch('current_password', 'password')]
    });
  }

  ngOnInit(): void {
  }

  changePassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    this.loginService.changePassword(this.passwordForm.get('current_password')?.value, this.passwordForm.get('password')?.value).subscribe({
      complete: () => this.matDialog.closeAll(),
      error: () => this.snackBarService.open('error when password is updated! Try again')
    });
  }

}
