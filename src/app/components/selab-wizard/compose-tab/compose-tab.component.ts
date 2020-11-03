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
  @Input() uiComponent: CompositeComponent;

  childrenOptions: string[];
  composeTarget: string;

  subComponent: UIComponent;
  subComponentProperties: any;

  inputValue: string;
  formData: {};

  chooseChild(event, option) {
    this.composeTarget = option;
    let uiComponentFactory: UIComponentFactory = new UIComponentFactory();
    this.subComponent = uiComponentFactory.create(this.composeTarget);
    console.log("create sub component");
    this.subComponentProperties = this.subComponent.getProperties();
    this.buildForm();
  }

  valueChange(event, value) {
    this.formData[value] = event;
    console.log(this.formData);
  }

  constructor() {
    this.formData = {};
  }

  insertComponent() {
    if (!this.checkIsFormFill()) {
      alert("You need to fill all input");
      return;
    }
    this.subComponent.setUIComponent(this.formData);
    this.uiComponent.addSubComponent(this.deepCopySubComponent());
    this.formData = {};
  }
  
  deepCopySubComponent(): UIComponent {
    let copySubComponent;
    copySubComponent = JSON.parse(JSON.stringify(this.subComponent));
    delete this.subComponent;
    return copySubComponent;
  }

  checkIsFormFill(): boolean {
    if(Object.keys(this.formData).length == 0)
      return false;
    let isCorrect = true;
    for (let key in this.formData) {
      if (this.formData[key] == "") {
        isCorrect = false;
        break;
      }
    }
    return isCorrect;
  }

  ngOnInit() {
    this.composeTarget = "";
    this.childrenOptions = this.uiComponent.getChildrenOptions();
  }
  
  buildForm() {
    for (let index = 0; index < this.subComponentProperties.length; index++) {
      if (this.subComponentProperties[index]["type"] == "Boolean") {
        this.formData[this.subComponentProperties[index]["value"]] = "false";
      }
      else if (this.subComponentProperties[index]["type"] == "String") {
        this.formData[this.subComponentProperties[index]["value"]] = "";
      }
    } 
  }
}