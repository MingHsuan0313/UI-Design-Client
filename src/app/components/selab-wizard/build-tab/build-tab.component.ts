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
  @Input() isComposite: boolean;
  buildFormProperties: any;
  inputValue: string;

  formData: {};

  constructor() {
    this.formData = {};
  }

  buildForm() {
    for (let index = 0; index < this.buildFormProperties.length; index++) {
      if (this.buildFormProperties[index]["type"] == "Boolean") {
        this.formData[this.buildFormProperties[index]["value"]] = "false";
      }
      else if (this.buildFormProperties[index]["type"] == "String") {
        this.formData[this.buildFormProperties[index]["value"]] = "";
      }
    }
  }

  valueChange(event, propertyName) {
    this.formData[propertyName] = event;
  }

  createComponent() {
    this.uiComponent = this.uiComponent
                          .setProperties(this.formData)
                          .setName(this.formData["name"]);
    if (!this.checkIsFormFill()) {
      alert("You need to fill all input");
      return;
    }

    if (this.isComposite)
      this.navigateToComposeTab();
    else
      this.navigateToStatusTab();

    this.formData = {};
  }

  concateString(str1, str2) {
    return str1 + str2;
  }

  checkIsFormFill(): boolean {
    if (Object.keys(this.formData).length == 0)
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
  
  update(uiComponent: UIComponent) {
    this.uiComponent = uiComponent;
  }

  navigateToComposeTab() {
    let tabLinkElements = document.getElementsByClassName("mat-tab-label-content");
    for (let index = 0; index < tabLinkElements.length; index++) {
      if ((tabLinkElements[index] as HTMLElement).innerText == "Compose Component") {
        console.log("hello");
        (tabLinkElements[index] as HTMLElement).click();
      }
    }
  }

  navigateToStatusTab() {
    let tabLinkElements = document.getElementsByClassName("mat-tab-label-content");
    for (let index = 0; index < tabLinkElements.length; index++) {
      if ((tabLinkElements[index] as HTMLElement).innerText == "Check Status")
        (tabLinkElements[index] as HTMLElement).click();
    }
  }

  ngOnInit() {
    this.buildFormProperties = this.uiComponent.getProperties();
    this.buildForm();
  }
}