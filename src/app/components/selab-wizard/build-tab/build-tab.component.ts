import { templateJitUrl } from '@angular/compiler';
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
    for (let index = 0; index < service['returnData'].getReturnDatas()['datas'].length; index++) {
      this.returnData.push(service['returnData'].getReturnDatas()['datas'][index]);
    }
  }

  chooseReturn(event, option, property) {
    console.log('toggle is from return');
    console.log(property);
    let currentTask = SelabGlobalStorage.getTaskGraph().currentTask;
    let parentTask = currentTask.parentTask;
    let hierarchy = `${parentTask.componentSelector}-${this.uiComponentBuilder.selector}`;
    let serviceReturnBindingObject = this.generateReturnClass(currentTask, option, property, hierarchy);
    if (option == "None") {
      this.deleteServiceReturnBinding(property["name"], hierarchy, option);
    }
    else {
      if (!this.checkIsReturnBindingExist(serviceReturnBindingObject["bindingPart"]["name"], serviceReturnBindingObject["hierarchy"], option)) {
        console.log('not existed');
        this.uiComponentBuilder.currentTaskStatus.push(serviceReturnBindingObject as any);
      }
      else
        console.log('exist');
    }
    console.log(this.uiComponentBuilder.currentTaskStatus);
  }

  deleteServiceReturnBinding(bindingPart: string, hierarchy: string, returnPropertyName: string) {
    console.log(`delete service return\nbinding part = ${bindingPart}\nhierarchy = ${hierarchy}\nreturn property name ${returnPropertyName}`);
    for (let index = 0; index < this.uiComponentBuilder.currentTaskStatus.length; index++) {
      let serviceReturnBindingObject = this.uiComponentBuilder.currentTaskStatus[index];
      if (serviceReturnBindingObject['hierarchy'] != hierarchy)
        continue;
      else {
        if (serviceReturnBindingObject['bindingPart']["name"] != bindingPart)
          continue
        else {
            console.log(`delete index ${index}`);
            this.uiComponentBuilder.currentTaskStatus.splice(index, 1);
        }
      }
    }
  }

  checkIsReturnBindingExist(bindingPart: string, hierarchy: string, returnPropertyName: string): boolean {
    console.log(`binding part = ${bindingPart}\nhierarchy = ${hierarchy}\nreturn property name = ${returnPropertyName}`);
    for (let index = 0; index < this.uiComponentBuilder.currentTaskStatus.length; index++) {
      let serviceReturnBindingObject = this.uiComponentBuilder.currentTaskStatus[index];
      if (serviceReturnBindingObject['hierarchy'] != hierarchy)
        continue;
      else {
        if (serviceReturnBindingObject['bindingPart']["name"] != bindingPart)
          continue
        else {
          let returnProperty = "";
          if (serviceReturnBindingObject["returnClass"]["class"] == "List") {
            returnProperty = serviceReturnBindingObject["returnClass"]["child"]["propertyName"];
          }
          else {
            returnProperty = serviceReturnBindingObject["returnClass"]["propertyName"];
          }
          if (returnProperty != returnPropertyName)
            continue
          else
            return true;
        }
      }
    }
    return false;
  }

  generateReturnClass(parentTask: WizardTask, option, property, hierarchy) {
    if (option == "None") {
      return null;
    }
    let bindingPart = property;
    let returnClass = {};
    if (parentTask.service.returnData.isList()) {
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

    let result = {
      "hierarchy": hierarchy,
      "bindingPart": bindingPart,
      "returnClass": returnClass
    };

    return result;
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

      this.formData[propertyName].type = propertyType

      if (propertyType == "Boolean") {
        this.formData[propertyName].value = false;
      }

      else if (propertyType == "String") {
        this.formData[propertyName].value = "";
      }

      else if (propertyType == "Option") {

      }

      else if (propertyType == "Integer") {

      }
    }
  }

  valueChange(event, property) {
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

      if (propertyType == "String") {
        if (propertyValue.length == 0)
          isCorrect = false;
      }

      else if (propertyType == "Boolean") {
        if (propertyValue == false || propertyValue == true)
          continue;
        else
          isCorrect = false;
      }

      else if (propertyType == "Option") {
        if (propertyValue.length == 0)
          isCorrect = false;
      }

      else if (propertyType == "Integer") {
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