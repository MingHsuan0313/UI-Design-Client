import { Component, Input, OnInit } from '@angular/core';
import { UIComponent } from 'src/app/models/ui-component-dependency';

@Component({
  selector: 'information-tab',
  templateUrl: './information-tab.component.html',
  styleUrls: ['./information-tab.component.css']
})
export class InformationTabComponent implements OnInit {
  @Input() isPipeline: boolean;
  @Input() uiComponent: UIComponent;

  constructor() { }

  ngOnInit() {
    console.log("Build Tab:" + this.isPipeline)
  }
}