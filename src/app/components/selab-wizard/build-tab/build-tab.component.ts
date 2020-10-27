import { Component, Input, OnInit } from '@angular/core';
import { UIComponent } from 'src/app/models/ui-component-dependency';

@Component({
  selector: 'build-tab',
  templateUrl: './build-tab.component.html',
  styleUrls: ['./build-tab.component.css']
})
export class BuildTabComponent implements OnInit {
  @Input() isPipeline: boolean;
  @Input() uiComponent: UIComponent;

  constructor() { }

  ngOnInit() {
    console.log(this.uiComponent);
    console.log("Build1 Tab:" + this.isPipeline)
  }
}
