import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar, private router: Router) { }

  openAndRedirect(message: string, route: string) {
    this._snackBar.open(message, undefined, {
      duration: 3000,
    });
    this.router.navigateByUrl(route);
  }
}
