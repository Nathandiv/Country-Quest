import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from '../../UI/shared-UI/footer/footer.component';
import { NavComponent } from '../../UI/shared-UI/nav/nav.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { CountryService } from '../../services/country.service';
import { NotificationService } from '../../services/notification.service';
import { LoaderhomeComponent } from '../loaderhome/loaderhome.component';
import { SearchComponent } from '../search/search.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,

  imports: [HttpClientModule,FooterComponent, NavComponent,RouterLink,NgIf,NgClass,NgStyle,LoaderhomeComponent, SearchComponent, FormsModule],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public items: any[] = [];
  private http = inject(HttpClient);
  private api = inject(CountryService)
  private filteredItems: any[] = []
  paginatedFlags: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 27; 
  totalPages: number = 0;
  searchText: string = ''
  isLoading = true;
  selectedRegion: string = '';
  sortOrder: 'asc' | 'desc' | 'reset' = 'asc';
  resetSort: boolean = false; 




  constructor(private notification: NotificationService, private router: Router, private route: ActivatedRoute)
  {
    this.fetchDetails()

    setTimeout(() =>{
      this.isLoading = false}, 1000
    )
  }

  title = 'project';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentPage = params['page'] ? +params['page'] : 1; }) 
    this.fetchDetails()
  }


public fetchDetails() {
  this.http.get<{items: any[ ] }>('https://restcountries.com/v3.1/all').subscribe((resp:any)=>{
  console.log(resp)
  this.items = resp;
  this.filteredItems = resp
  this.sortItems();

  this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
  this.updatePaginatedProducts();

})
}
updatePaginatedProducts() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  this.paginatedFlags = this.filteredItems.slice(startIndex, startIndex + this.itemsPerPage);
}
nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updatePaginatedProducts();
    this.router.navigate([], { queryParams: { page: this.currentPage }, queryParamsHandling: 'merge' });

  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updatePaginatedProducts();
    this.router.navigate([], { queryParams: { page: this.currentPage }, queryParamsHandling: 'merge' });

  }
}

onSearchTextEntered(searchValue:string){
  this.searchText = searchValue
  this.currentPage = 1

  if (searchValue === ''){
    this.filteredItems = this.items
  }
  else{
    
    this.filteredItems = this.items.filter(item => 
      item.name.common.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.region.toLowerCase().includes(searchValue.toLowerCase())
    )
  }
  this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage)
  this.updatePaginatedProducts()
}


toggleFavourite(item: any) {
  if (this.isFavourited(item)) {
    this.api.removeFavourite(item);
  } else {
    this.api.addFavourite(item);
  }
}
 
isFavourited(item:any):boolean{
return this.api.isFavourited(item)
}

onSortOrderChange() {
  this.sortItems();
  this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
  this.updatePaginatedProducts();
}

onRegionChange(selectedRegion: string) {
  if (selectedRegion) {
    this.filteredItems = this.items.filter(item =>
      item.region.toLowerCase() === selectedRegion.toLowerCase()
    );
  } else {
    this.filteredItems = this.items;
  }

  this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
  this.sortItems(); 
  this.updatePaginatedProducts();
}

sortItems() {
  this.filteredItems.sort((a, b) => {
    const nameA = a.name.common.toLowerCase();
    const nameB = b.name.common.toLowerCase();

    if (this.sortOrder === 'asc') {
      return nameA.localeCompare(nameB); // A-Z (ascending)
    } else if (this.sortOrder === 'desc') {
      return nameB.localeCompare(nameA); // Z-A (descending)
    }
    return 0; // If 'reset', no sorting
  });
}
toggleSortOrder() {
  this.resetSort = !this.resetSort; // Toggle reset flag

  if (this.resetSort) {
    // If resetting, don't apply A-Z or Z-A sorting
    this.sortOrder = 'asc';  // Optionally reset to A-Z for visual consistency
  } else {
    // If not resetting, apply the selected sort order
    this.sortItems();
  }

  this.updatePaginatedProducts();
}
}
