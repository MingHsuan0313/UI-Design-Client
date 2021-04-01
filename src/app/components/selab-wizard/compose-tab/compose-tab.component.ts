import { Component, Input, OnInit } from '@angular/core';
import { UIComponent } from 'src/app/models/ui-component-dependency';
import { UIComponentBuilder } from 'src/app/components/selab-wizard/UIComponentBuilder';
import { UIComponentConfig } from '../uicomponent-config';
import { UIComponentFactory } from '../uicomponent-factory';
import GraphEditorService from 'src/app/services/externalRepresentation/graph-editor.service';
import { MatDialogRef } from '@angular/material';
import { SelabWizardComponent, WizardStorage } from '../selab-wizard.component';
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage';
import { ServiceComponentModel } from 'src/app/models/service-component-dependency';
import { WizardTask } from 'src/app/models/wizardTask/TaskGraph.model';

@Component({
  selector: 'compose-tab',
  templateUrl: './compose-tab.component.html',
  styleUrls: ['./compose-tab.component.css']
})
export class ComposeTabComponent implements OnInit {
  @Input() isPipeline: boolean;
  @Input() uiComponentBuilder: UIComponentBuilder;
  @Input() wizardStorage: WizardStorage;

  selectedBuilder: UIComponentBuilder;

  isClean: boolean;

  childrenOptions: string[];
  composeTarget: string;

  subComponentBuilder: UIComponentBuilder;
  subComponentProperties: any;

  inputValue: string;
  formData: {};

  returnData: any[] = []; // form pipeline return

  constructor(private graphEditorService: GraphEditorService,
    public wizard: MatDialogRef<SelabWizardComponent>,
  ) {
    this.isClean = false;
    this.formData = {};
    this.selectedBuilder = this.uiComponentBuilder;
  }

  chooseBuilder(event, builder: UIComponentBuilder) {
    console.log('choose builder');
    console.log(builder)
    this.selectedBuilder = builder;
    this.childrenOptions = UIComponentConfig.getChildrenOptions(this.selectedBuilder.type);
  }

  chooseReturn(event, option, property) {
    console.log('toggle is from return');
    console.log(property);
    let currentTask = SelabGlobalStorage.getTaskGraph().currentTask;
    let parentTask = currentTask.parentTask;
    let hierarchy = `${parentTask.componentSelector}-${this.subComponentBuilder.selector}`;
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

  generateReturnClass(currentTask: WizardTask, option, property, hiearachy) {
    if (option == "None") {
      return null;
    }
    let bindingPart = property;
    let returnClass = {};
    if (currentTask.service.returnData.isList()) {
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

  setReturn(service: ServiceComponentModel) {
    this.returnData = ["None"];
    for (let index = 0; index < service['returnData'].getReturnDatas()['datas'].length; index++) {
      this.returnData.push(service['returnData'].getReturnDatas()['datas'][index]);
    }
  }

  closeWizard() {
    let currentTask = SelabGlobalStorage.getTaskGraph().currentTask;
    this.wizard.close(currentTask);
  }

  chooseChild(event, option) {
    this.isClean = true;
    this.composeTarget = option;
    let pageId = this.graphEditorService.selectedPageId;
    this.subComponentBuilder = UIComponentFactory.create(this.composeTarget, pageId);
    this.subComponentBuilder.setDescription(`${this.selectedBuilder.description} - ${this.subComponentBuilder.selector}`);
    this.subComponentProperties = UIComponentConfig.getProperties(this.subComponentBuilder.type);
    this.buildForm();
  }

  insertSubComponent() {
    this.isClean = false;
    if (!this.checkIsFormFill()) {
      alert("You need to fill all input");
      return;
    }
    this.subComponentBuilder.setProperties(this.formData)
      .setName(this.formData["name"]["value"]);
    this.selectedBuilder.addSubComponentBuilder(this.subComponentBuilder);
    this.wizardStorage.addUIComponentBuilder(this.subComponentBuilder);
  }

  valueChange(event, property) {
    this.formData[property.name]["value"] = event;
    this.formData[property.name]["type"] = property["type"];
  }

  isExistedInServiceReturnBinidng(propertyName: string): boolean {
    let currentTask = SelabGlobalStorage.getTaskGraph().currentTask;
    let parentTask = currentTask.parentTask;
    let hierarchy = `${parentTask.componentSelector}-${this.subComponentBuilder.selector}`;
    for(let index = 0; index < this.uiComponentBuilder.currentTaskStatus.length; index++) {
      let serviceReturnBindingObject = this.uiComponentBuilder.currentTaskStatus[index];
      if (serviceReturnBindingObject['hierarchy'] != hierarchy)
        continue;
      else {
        if (serviceReturnBindingObject['bindingPart']['name'] == propertyName)
          return true;
      }
    }
    return false;
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

      if(this.isPipeline && this.isExistedInServiceReturnBinidng(propertyName))
        continue;

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

  ngOnInit() {
    this.composeTarget = "";
  }

  buildForm() {
    this.formData = {};
    for (let index = 0; index < this.subComponentProperties.length; index++) {
      let propertyName = this.subComponentProperties[index]["name"];
      let propertyType = this.subComponentProperties[index]["type"];
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
}