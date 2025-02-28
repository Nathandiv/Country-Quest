

import { Component, inject, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';

import { NgFor, NgIf } from '@angular/common';
import { NavComponent } from "../../UI/shared-UI/nav/nav.component";
import { FooterComponent } from "../../UI/shared-UI/footer/footer.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [NgFor, NgIf, NavComponent, FooterComponent, RouterLinkActive, RouterLink],
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favouritedCountries: any[] = [];

  constructor(private countryService: CountryService) { }

  app = inject(AppComponent);

  ngOnInit(): void {
   
    this.favouritedCountries = this.countryService.getFavourites();
  }

 
  removeFromFavourites(country: any): void {
    this.countryService.removeFavourite(country);
   
    
    this.favouritedCountries = this.countryService.getFavourites();
  }
}



