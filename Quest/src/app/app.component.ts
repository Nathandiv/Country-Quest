import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
// import { initFlowbite } from 'flowbite';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  title = 'app';
  name: String = "";
  CopyText: String = "";
  storeValue: String = "";

  saveName() {
    let name = String(this.name);
    window.localStorage.setItem("name", name);
}

getName() {
    this.storeValue = 
        window.localStorage.getItem("name")
        ?? "No Value Stored";
}
}


