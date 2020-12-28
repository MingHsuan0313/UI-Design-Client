import { Component, Input, OnInit } from '@angular/core';
import { CompositeComponent } from 'src/app/models/internalRepresentation/CompositeComponent.model';
import { UIComponent } from 'src/app/models/ui-component-dependency';
import { UIComponentBuilder } from 'src/app/components/selab-wizard/UIComponentBuilder';
import { UIComponentConfig } from '../uicomponent-config';
import { UIComponentFactory } from '../uicomponent-factory';

@Component({
  selector: 'compose-tab',
  templateUrl: './compose-tab.component.html',
  styleUrls: ['./compose-tab.component.css']
})
export class ComposeTabComponent implements OnInit {
  @Input() isPipeline: boolean;
  @Input() uiComponentBuilder: UIComponentBuilder;
  
  isClean: boolean;

  childrenOptions: string[];
  composeTarget: string;

  subComponentBuilder: UIComponentBuilder;
  subComponentProperties: any;

  inputValue: string;
  formData: {};

  chooseChild(event, option) {
    this.isClean = true;
    this.composeTarget = option;
    this.subComponentBuilder = UIComponentFactory.create(this.composeTarget);
    this.subComponentProperties = UIComponentConfig.getProperties(this.subComponentBuilder.type);
    this.buildForm();
  }

  valueChange(event, value) {
    this.formData[value] = event;
  }
  
  constructor() {
    this.isClean = false;
    this.formData = {};
  }

  insertComponent() {
    this.isClean = false;
    if (!this.checkIsFormFill()) {
      alert("You need to fill all input");
      return;
    }
    this.subComponentBuilder.setProperties(this.formData)
      .setName(this.formData["name"]);
    let subComponent = this.subComponentBuilder.build();
    // this.uiComponent.addSubComponent(this.deepCopySubComponent());
    this.uiComponentBuilder.addSubComponent(subComponent);
    this.formData = {};
  }
  
  deepCopySubComponent(): UIComponent {
    let copySubComponent;
    // copySubComponent = JSON.parse(JSON.stringify(this.subComponent));
    // delete this.subComponent;
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
    this.childrenOptions = UIComponentConfig.getChildrenOptions(this.uiComponentBuilder.type);
  }
  
  buildForm() {
    this.formData = {};
    for (let index = 0; index < this.subComponentProperties.length; index++) {
      if (this.subComponentProperties[index]["type"] == "Boolean") {
        this.formData[this.subComponentProperties[index]["value"]] = "false";
      }
      else if (this.subComponentProperties[index]["type"] == "String") {
        this.formData[this.subComponentProperties[index]["value"]] = "";
      }
    } 
    console.log("build form...")
    console.log(this.formData);
  }
}