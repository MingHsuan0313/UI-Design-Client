import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UIComponent } from 'src/app/models/ui-component-dependency';
import { UIComponentBuilder } from 'src/app/components/selab-wizard/UIComponentBuilder';
import { Library } from '../../../shared/library';
import { UIComponentConfig } from '../uicomponent-config';
import { UIComponentFactory } from '../uicomponent-factory';

@Component({
  selector: 'build-tab',
  templateUrl: './build-tab.component.html',
  styleUrls: ['./build-tab.component.css']
})
export class BuildTabComponent implements OnInit {
  @Input() isPipeline: boolean;
  @Input() uiComponentBuilder: UIComponentBuilder;
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

  setComponent() {
    this.uiComponentBuilder.setProperties(this.formData)
      .setName(this.formData["name"]);
    // this.uiComponent = this.uiComponent
    //                       .setProperties(this.formData)
    //                       .setName(this.formData["name"]);
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
  
  navigateToComposeTab() {
    let tabLinkElements = document.getElementsByClassName("mat-tab-label-content");
    for (let index = 0; index < tabLinkElements.length; index++) {
      if ((tabLinkElements[index] as HTMLElement).innerText == "Compose Component") {
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
    this.buildFormProperties = UIComponentConfig.getProperties(this.uiComponentBuilder.type);
    this.buildForm();
  }
}