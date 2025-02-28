import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { CountryInterface } from '../types/country.interface';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})


export class CountryService {
  
  private favouritedItem: any[] = []
  localStorageKey!: string;

  constructor(private http: HttpClient, private notification: NotificationService) { }

  getAllCountries() {
    return this.http.get<CountryInterface[]>(environment.COUNTRY.ALL);
  }

  getCountryByName(countryName: string) {
    return this.http.get<CountryInterface[]>(`${environment.COUNTRY.NAME}${countryName}`);
  }


  getCountryByCapitalCity(capitalCity: string) {
    return this.http.get<CountryInterface[]>(`${environment.COUNTRY.CAPITAL_CITY}${capitalCity}`);
  }

  isFavourited(item: any): boolean {
    const favourites = this.getFavourites();
    return favourites.some(fav => fav.name.common === item.name.common);
  }
  
  addFavourite(item: any): void {
    let favourites = this.getFavourites();
    if (!this.isFavourited(item)) {
      favourites.push(item);
      this.saveFavourites(favourites);
      this.notification.showSuccess(`Added ${item.name.common} to favourites!`);
    }
  }



  removeFavourite(item: any): void {
    let favourites = this.getFavourites();
    const index = favourites.findIndex(fav => fav.name.common === item.name.common);
    if (index !== -1) {
      favourites.splice(index, 1);
      this.saveFavourites(favourites);
      this.notification.showError(`Removed ${item.name.common} from favourites.`);
    }
  }
 
  getFavourites(): any[] {
    const favourites = localStorage.getItem(this.localStorageKey);
    return favourites ? JSON.parse(favourites) : [];
  }

  private saveFavourites(favourites: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(favourites));
  }

}


