import { Component, inject, OnInit } from '@angular/core';
 import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-registerlogin',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './registerlogin.component.html',
  styleUrl: './registerlogin.component.css'
})
export class RegisterloginComponent implements OnInit {

  authService = inject(AuthService)
  constructor(private details: CountryService) {
    
  }
  ngOnInit(): void {
  }

  register(username: string, email: string, password: string){
  
    if(!username){
      alert('username needed')
      return
    }
  
    if(!email){
      alert('email needed')
      return
    }
    if(!password){
      alert('password needed')
      return
    }
    this.authService.register({username, email, password})
  
  }

}
