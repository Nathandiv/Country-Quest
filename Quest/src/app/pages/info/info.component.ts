import { CommonModule } from '@angular/common';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CountryInterface } from '../../types/country.interface';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { NavComponent } from '../../UI/shared-UI/nav/nav.component';
import { FooterComponent } from '../../UI/shared-UI/footer/footer.component';
import { LoaderComponent } from '../loader/loader.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgClass, NavComponent, FooterComponent, RouterLink ,LoaderComponent, CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit {
 private api = inject(CountryService)
 public items: any[] = [];
 private http = inject(HttpClient)
  countries: CountryInterface[] = [];
  countryName: string | null = null
  isLoading = true;
  activeAccordion: number | null = null;
  returnPage: number | null = null;

constructor(private countryService: CountryService, private route: ActivatedRoute, private router:Router, private noti: NotificationService) {
 setTimeout(() =>{
  this.isLoading = false}, 1000
  )
this.router.events.subscribe(event => {

if (event instanceof NavigationEnd){
window.scrollTo(0, 0);
}
});
}

public fetchDetails() {
  this.http.get<{items: any[ ] }>('https://restcountries.com/v3.1/all').subscribe((resp:any)=>{
  console.log(resp)
  this.items = resp;
  })
}


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.countryName = params.get('contry_name')!;
    });
    this.route.queryParams.subscribe(params => {
      this.returnPage = params['page'] ? +params['page'] : 1; 
    });
    this.getSingleCountry(this.countryName)


  }

  getSingleCountry(countryName: string | null) {
    if (countryName) {
      this.countryService.getCountryByName(countryName).subscribe((countries) => {
        if (countries.length === 1) {
          this.countries = countries;
        } else {
          const country = countries.find(c => c.name.common.toLowerCase() === countryName.toLowerCase());

          if (country) {
            this.countries = [country];
          } else {
            const fallbackCountry = countries.find(c => c.cca2 === 'IN'); 
            if (fallbackCountry) {
              this.countries = [fallbackCountry];
            } else {
              console.error('Country not found!');
              this.countries = []; 
            }
          }
        }
        console.log(this.countries);
      });
    }
  }

  displayLanguage(languages: any) {
    let text = '';

    if (typeof languages === 'object' && languages !== null) {
      let arr = Object.entries(languages);

      for (let i = 0; i < arr.length; i++) {
        text += arr[i][1] + ', ';
      }
    }

    return text;
  }

  displayCurrency(currencies: any) {
    let text = '';

    if (typeof currencies === 'object' && currencies !== null) {
      let arr2 = Object.entries(currencies);

      for (let i = 0; i < arr2.length; i++) {
        const value = arr2[i][1];

        if (typeof value === 'object' && value !== null && 'name' in value) {
          text += (value as { name: string}).name + ', ';
        } else {
          text += value + ', ';
        }
      }
    }

    return text;
  }

  toggleFavourite(country: any) {
    if (this.isFavourited(country)) {
      this.api.removeFavourite(country);
    } else {
      this.api.addFavourite(country);
    }
  }
   
  isFavourited(country:any):boolean{
  return this.api.isFavourited(country)
  }



  toggleAccordion(index: number): void {
    if (this.activeAccordion === index) {
      this.activeAccordion = null;
    } else {
      this.activeAccordion = index;
    }
  }
}
