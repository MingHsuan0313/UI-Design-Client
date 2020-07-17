// import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {
    console.log("Hello My Name is Tim")

   }

  ngOnInit() {
  }

}
