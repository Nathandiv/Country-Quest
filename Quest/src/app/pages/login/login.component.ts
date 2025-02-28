import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CountryService } from '../../services/country.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, RouterLinkActive, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService)
  constructor(private details: CountryService){}

login(email: string, password: string){
  if(!email){
    alert('need email')
    return
  }
  if(!password){
    alert('password needed')
    return
  }
  this.authService.login({email, password})
}

}
