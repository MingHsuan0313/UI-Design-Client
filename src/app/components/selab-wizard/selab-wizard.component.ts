import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { PipelineCreateOperationAction, PipelineCreateTaskAction, PipelineReadTasksAction } from 'src/app/models/store/actions/pipelineTask.action';
import { AppState } from 'src/app/models/store/app.state';
import { operationPoolSelector } from 'src/app/models/store/reducers/PipelineStorageSelector';
import { UIComponent } from 'src/app/models/ui-component-dependency';
import { Operation, Task } from 'src/app/models/wizard-task-dependency';
import { SelabHeaderComponent } from '../selab-header/selab-header.component';
import { BindServiceTabComponent } from './bind-service-tab/bind-service-tab.component';
import { BuildTabComponent } from './build-tab/build-tab.component';
import { ComposeTabComponent } from './compose-tab/compose-tab.component';
import { InformationTabComponent } from './information-tab/information-tab.component';
import { PipelineTabComponent } from './pipeline-tab/pipeline-tab.component';
import { UIComponentFactory } from './uicomponent-factory';

@Component({
  selector: 'selab-wizard',
  templateUrl: './selab-wizard.component.html',
  styleUrls: ['./selab-wizard.component.scss']
})
export class SelabWizardComponent implements OnInit {

  tabs = [];
  isPipeline: boolean = false;
  isComposite: boolean = false;
  genere: string = ""; // CoreUI, Material...
  type: string = ""; // form, dropdown...
  category: string = ""; // informative, input control...
  uiComponent: UIComponent; // uiComponent being create
  lastTab: string;

  // it has return data if in pipeline mode
  operation: Operation;
  @ViewChild("selabtabs") tabGroup: MatTabGroup;
  @ViewChild("build") buildTab: BuildTabComponent;
  @ViewChild("compose") composeTab: ComposeTabComponent;
  @ViewChild("status") infoTab: InformationTabComponent;
  @ViewChild("pipeline") pipelineTab: PipelineTabComponent;
  @ViewChild("service") serviceTab: BindServiceTabComponent;

  constructor(
    public dialogRef: MatDialogRef<SelabHeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    store: Store<AppState>
  ) {
  }

  // receive data from dialog input
  initialization() {
    this.isPipeline = this.data.isPipeline;
    this.genere = this.data.genere;
    this.isComposite = this.data.isComposite;
    this.type = this.data.type;
    this.category = this.data.category;

    if (this.isPipeline) {
      this.operation = this.data.operation;
    }

    this.uiComponent = UIComponentFactory.create(this.type);
  }

  // this function if for update componet tree structure for information tab
  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    if(this.lastTab == "Build Component")
      this.uiComponent = this.buildTab.uiComponent;
    else if(this.lastTab == "Compose Component")
      this.uiComponent = this.composeTab.uiComponent;
    else if(this.lastTab == "Check Status")
      this.uiComponent = this.infoTab.uiComponent;
    else if(this.lastTab == "Bind Service")
      this.uiComponent = this.serviceTab.uiComponent;
    else if(this.lastTab == "Generate Pipeline")
      this.uiComponent = this.pipelineTab.uiComponent;


    if(tabChangeEvent.tab.textLabel == "Build Component")
      this.buildTab.update(this.uiComponent);
    else if(tabChangeEvent.tab.textLabel == "Compose Component")
      this.composeTab.update(this.uiComponent);
    else if(tabChangeEvent.tab.textLabel == "Check Status")
      this.infoTab.update(this.uiComponent);
    else if(tabChangeEvent.tab.textLabel == "Bind Service")
      this.serviceTab.update(this.uiComponent);
    else if(tabChangeEvent.tab.textLabel == "Generate Pipeline")
      this.pipelineTab.update(this.uiComponent);

    this.lastTab = tabChangeEvent.tab.textLabel;
  }

  checkWizardStatus() {
    let openCorrect = true;
    let description = "";
    console.log("open wizard : check status");

    if (this.genere == "Genre" || this.genere == "")
      description += "You need to choose Genre\n";
    if (this.category == "Category" || this.category == "")
      description += "You need to choose Category\n";
    if (this.uiComponent == undefined)
      description += "You need to choose UI Component\n";

    if (description.length > 0) {
      this.dialogRef.close();
      alert(description);
      return false;
    }
    return true;
  }

  checkUIComponent() {
    console.log(this.uiComponent);
  }

  ngOnInit() {
    this.initialization();
    if (!this.checkWizardStatus())
      return;

    // composite component
    if (this.data.isComposite) {
      this.tabs = ["Build Component", "Compose Component", "Check Status", "Bind Service", "Generate Pipeline"];
    }
    // basic component
    else {
      this.tabs = ["Build Component", "Check Status"];
    }

    this.lastTab = this.tabs[0];
  }
}