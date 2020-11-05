import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationItem } from '../navigationItem';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  @Input() items: NavigationItem[];
  @ViewChild('childMenu') public childMenu;

  constructor() { }

  ngOnInit() {
  }

}
