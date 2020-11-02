import { Component, Input, OnInit } from '@angular/core';
import { CompositeComponent } from 'src/app/models/internalRepresentation/CompositeComponent.model';
import { UIComponent } from 'src/app/models/ui-component-dependency';
import { UIComponentFactory } from '../uicomponent-factory';

@Component({
  selector: 'compose-tab',
  templateUrl: './compose-tab.component.html',
  styleUrls: ['./compose-tab.component.css']
})
export class ComposeTabComponent implements OnInit {
  @Input() isPipeline: boolean;
  @Input() uiComponent: any;

  childrenOptions: string[];
  composeTarget: string;

  subComponent: any;
  subComponentProperties: any;

  inputValue: string;
  formData:any;
  
  chooseChild(event,option){
    this.composeTarget = option;
    let uiComponentFactory: UIComponentFactory = new UIComponentFactory();
    this.subComponent = uiComponentFactory.create(this.composeTarget);
    console.log("create sub component");
    this.subComponentProperties = this.subComponent.getProperties();
    this.formData = {};
  }
  
  valueChange(event,value) {
    this.formData[value] = event;
    console.log(this.formData);
  }

  constructor() {
    this.formData = {};
   }

  ngOnInit() {
    this.composeTarget = "";
    this.childrenOptions = this.uiComponent.getChildrenOptions();
    console.log("option")
    console.log(this.childrenOptions);
    console.log("Build Tab:" + this.isPipeline)
  }

}
