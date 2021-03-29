import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UIComponentBuilder } from 'src/app/components/selab-wizard/UIComponentBuilder';
import { ServiceComponentModel } from 'src/app/models/service-component-dependency';
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage';
import { WizardTask } from 'src/app/models/wizardTask/TaskGraph.model';
import { StatusDialogComponent } from '../pipeline-tab/status-dialog/status-dialog.component';
import { SelabWizardComponent } from '../selab-wizard.component';
import { UIComponentConfig } from '../uicomponent-config';

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

  returnData: any[] = []; // from pipeline return

  formData: {};

  constructor(
    private statusDialog: MatDialog,
    public wizard: MatDialogRef<SelabWizardComponent>,
  ) {
    this.formData = {};
  }

  setReturn(service: ServiceComponentModel) {
    this.returnData = ["None"];
    for(let index = 0;index < service['returnData'].getReturnDatas()['datas'].length;index++) {
      this.returnData.push(service['returnData'].getReturnDatas()['datas'][index]);
    }
  }

  chooseReturn(event, option, property) {
    console.log('toggle is from return');
    console.log(event);
    console.log(property);
    let currentTask = SelabGlobalStorage.getTaskGraph().currentTask;
    let parentTask = currentTask.parentTask;
    let hiearachy = `${parentTask.componentSelector}-${this.uiComponentBuilder.selector}`;
    this.uiComponentBuilder.currentTaskStatus[hiearachy] = this.generateReturnClass(currentTask, option, property, hiearachy);
    if(this.uiComponentBuilder.currentTaskStatus[hiearachy] == null)
      delete this.uiComponentBuilder.currentTaskStatus[hiearachy];
  }

  generateReturnClass(parentTask: WizardTask, option, property, hiearachy) {
    if(option == "None") {
      return null;
    }
    let bindingPart = property;
    let returnClass = {};
    if(parentTask.service.returnData.isList()) {
      returnClass = {
        "class": "List",
        "propertyName": "l1",
        "child": {
          "class": "String",
          "propertyName": option
        }
      }
    }
    else {
      returnClass = {
        "class": "String",
        "propertyName": option
      }
    }

    return {
      "hiearchy": hiearachy,
      "bindingPart": bindingPart,
      "returnClass": returnClass
    };
  }

  closeWizard() {
    let currentTask = SelabGlobalStorage.getTaskGraph().currentTask;
    this.wizard.close(currentTask);
  }

  setComponentProperties() {
    this.uiComponentBuilder
      .setProperties(this.formData)
      .setName(this.formData["name"].value);
    if (!this.checkIsFormFill()) {
      alert("You need to fill all input");
      return;
    }

    if (this.isComposite)
      this.navigateToComposeTab();
    else
      this.navigateToStatusTab();
  }

  buildForm() {
    for (let index = 0; index < this.buildFormProperties.length; index++) {
      let propertyName = this.buildFormProperties[index]["name"];
      let propertyType = this.buildFormProperties[index]["type"];
      if (this.formData[propertyName] == undefined) {
        this.formData[propertyName] = {};
      }

      if (propertyType == "Boolean") {
        this.formData[propertyName].value = false;
      }
      else if (propertyType == "String") {
        this.formData[propertyName].value = "";
      }
    }
  }

  valueChange(event, property) {
    console.log('value changed !')
    console.log(property);
    this.formData[property.name]["value"] = event;
    this.formData[property.name]["type"] = property["type"];
  }

  concateString(str1, str2) {
    return str1 + str2;
  }

  checkIsFormFill(): boolean {
    let isCorrect = true;
    console.log('check is form filled ?')
    console.log(this.formData);
    console.log(this.uiComponentBuilder.currentTaskStatus);
    // check user input
    for (let propertyName in this.formData) {
      let propertyType = this.formData[propertyName].type;
      let propertyValue = this.formData[propertyName].value;

      if(propertyType == "String") {
        if (propertyValue.length == 0)
          isCorrect = false;
      }

      else if(propertyType == "Boolean") {
        if (propertyValue == false || propertyValue == true)
          continue;
        else
          isCorrect = false;
      }

      else if(propertyType == "Option") {
        if (propertyValue.length == 0)
          isCorrect = false;
      }

      else if(propertyType == "Integer") {
        continue;
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

  showStatus() {
    this.statusDialog.open(StatusDialogComponent, {
      width: '50%',
      height: '60%',
      autoFocus: true
    })
  }
}