import { Component, Input, OnInit } from '@angular/core';
import { UIComponent } from 'src/app/models/ui-component-dependency';
import { UIComponentBuilder } from 'src/app/components/selab-wizard/UIComponentBuilder';
import { UIComponentConfig } from '../uicomponent-config';
import { UIComponentFactory } from '../uicomponent-factory';
import GraphEditorService from 'src/app/services/externalRepresentation/graph-editor.service';
import { MatDialogRef } from '@angular/material';
import { SelabWizardComponent } from '../selab-wizard.component';
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
  }

  chooseReturn(event, option, property) {
    console.log('toggle is from return');
    console.log(event);
    console.log(property);
    let currentTask = SelabGlobalStorage.getTaskGraph().currentTask;
    let parentTask = currentTask.parentTask;
    let hiearachy = `${parentTask.componentSelector}-${this.subComponentBuilder.selector}`;
    this.uiComponentBuilder.currentTaskStatus[hiearachy] = this.generateReturnClass(currentTask , option, property, hiearachy);
    if (this.uiComponentBuilder.currentTaskStatus[hiearachy] == null)
      delete this.uiComponentBuilder.currentTaskStatus[hiearachy];
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
      .setName(this.formData["name"]);
    let subComponent = this.subComponentBuilder.build();
    this.uiComponentBuilder.addSubComponent(subComponent);
    this.formData = {};
  }

  valueChange(event, value) {
    this.formData[value] = event;
  }

  deepCopySubComponent(): UIComponent {
    let copySubComponent;
    return copySubComponent;
  }

  checkIsFormFill(): boolean {
    if(Object.keys(this.uiComponentBuilder.currentTaskStatus).length > 0)
      return true;
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