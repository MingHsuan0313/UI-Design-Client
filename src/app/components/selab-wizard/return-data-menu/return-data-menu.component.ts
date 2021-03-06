import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-return-data-menu',
  templateUrl: './return-data-menu.component.html',
  styleUrls: ['./return-data-menu.component.css']
})
export class ReturnDataMenuComponent implements OnInit {
  datas: any[];
  constructor() {
    this.datas = []
  }

  render(datas: any[]) {
    this.datas = datas;
  }

  ngOnInit() {
  }
}