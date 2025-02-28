import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoComponent } from './pages/info/info.component';
import { ErrorComponent } from './pages/error/error.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterloginComponent } from './pages/registerlogin/registerlogin.component';

export const routes: Routes = [

    {path: '', component: LandingComponent},
    // {path:'Register', component: RegisterloginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'info/:contry_name', component: InfoComponent},
    {path: 'info', component: InfoComponent},
    {path: 'favourites', component: FavouritesComponent},
    // {path: 'login', component:LoginComponent},
    {path: '**', component: ErrorComponent, redirectTo:''}
];
