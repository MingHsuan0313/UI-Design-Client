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
  buildFormProperties: string[];
  inputValue: string;

  form: FormGroup;
  formData: {};

  constructor() {
    this.formData = {};
  }
  
  buildForm() {
    let formGroupObject:Object = {};
    for(let index = 0;index < this.buildFormProperties.length;index++) {
      formGroupObject[this.buildFormProperties[index]] = new FormControl();
      this.formData[this.buildFormProperties[index]] = "";
    }
    console.log("construc form data");
    console.log(this.formData);
    this.form = new FormGroup(formGroupObject as any);
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
    this.buildFormProperties = Library.formProperties[this.uiComponent.type.toString()];
    this.buildForm();
    console.log("Build1 Tab:" + this.isPipeline)
  }
}
