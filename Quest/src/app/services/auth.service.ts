import { inject, Injectable } from '@angular/core';
import { UserInterface } from '../types/user';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isLoggedIn: boolean = false;
  user: UserInterface[] = [];
  router = inject(Router);
  noti = inject(NotificationService)

  constructor() {}

  register(userData: UserInterface) {
    const userEmail = userData.email;
    console.log(userData);

    for (let index = 0; index < this.user.length; index++) {
      if (this.user[index].email === userEmail) {
        alert('Email already taken');
        return;
      }
    }

    this.user.push(userData);
    this.noti.showRegister('Your account has been registered!')
        // alert('Registered successfully');
    this.router.navigateByUrl('/login');
  }
login(userData: UserInterface){
  for (let i = 0; i < this.user.length; i++) {
    if(this.user[i].email === userData.email && this.user[i].password === userData.password){
      this.noti.showRegister('Logged in, welcome!')
      this.router.navigateByUrl('/landing');

    }
    else{
      alert('wrong details')
    }
    
    
  }
}


}
