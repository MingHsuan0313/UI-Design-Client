import { Component, Input, OnInit } from '@angular/core';
import { UIComponent } from 'src/app/models/ui-component-dependency';

@Component({
  selector: 'bind-service-tab',
  templateUrl: './bind-service-tab.component.html',
  styleUrls: ['./bind-service-tab.component.css']
})
export class BindServiceTabComponent implements OnInit {
  @Input() uiComponent: UIComponent;

  constructor() { }

  ngOnInit() {
  }

}