import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( private snackBar: MatSnackBar, private router: Router) {
   }

   showSuccess(message: string):void {
    const snackBar = this.snackBar.open(message, 'View Favourites', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: 'success-snackbar'
    });
   snackBar.onAction().subscribe(() => {
    this.router.navigate(['/favourites']);
  });
}
showRegister(message: string):void {
  const snackBar = this.snackBar.open(message, 'Close', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    panelClass: 'success-snackbar'
  });
 snackBar.onAction().subscribe(() => {
  // this.router.navigate(['']);
});
}
 
  

   showError(message: string): void {
    this.snackBar.open(message, 'close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: 'error-snackbar'
    })
  }

}

