import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UIComponent } from 'src/app/models/ui-component-dependency';
import { Library } from '../../../shared/library';

@Component({
  selector: 'build-tab',
  templateUrl: './build-tab.component.html',
  styleUrls: ['./build-tab.component.css']
})
export class BuildTabComponent implements OnInit {
  @Input() isPipeline: boolean;
  @Input() uiComponent: UIComponent;
  buildFormProperties: any;
  inputValue: string;

  formData: {};

  constructor() {
    this.formData = {};
  }
  
  buildForm() {
    for(let index = 0;index < this.buildFormProperties.length;index++) {
      if(this.buildFormProperties[index]["type"] == "Boolean") {
        this.formData[this.buildFormProperties[index]["value"]] = "false";
      }
      else if(this.buildFormProperties[index]["type"] == "String") {
        this.formData[this.buildFormProperties[index]["value"]] = "";
      }
    }
  }
  
  valueChange(event,propertyName) {
    this.formData[propertyName] = event;
    console.log("update form data");
    console.log(this.formData);
  }
  
  createComponent() {
    console.log(this.formData);
  }
  
  concateString(str1,str2) {
    return str1 + str2;
  }

  ngOnInit() {
    this.buildFormProperties = this.uiComponent.getProperties();
    this.buildForm();
    console.log("form property")
    console.log(this.buildFormProperties)
    console.log("Build1 Tab:" + this.isPipeline)
  }
}
