import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { PipelineCreateOperationAction, PipelineCreateTaskAction, PipelineReadTasksAction } from 'src/app/models/store/actions/pipelineTaskAction/pipelineTask.action';
import { AppState } from 'src/app/models/store/app.state';
import { UIComponent } from 'src/app/models/ui-component-dependency';
import { Operation, Task } from 'src/app/models/wizard-task-dependency';
import { SelabHeaderComponent } from '../selab-header/selab-header.component';
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
  @ViewChild("status") infoTab: InformationTabComponent;
  @ViewChild("pipeline") pipelineTab: PipelineTabComponent;

  constructor(
    public dialogRef: MatDialogRef<SelabHeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    store: Store<AppState>
  ) {
    store.subscribe(() => {
      console.log("update");
    })
    let operation = new Operation().setName("tt").setClassName("ss");
    store.dispatch(new PipelineCreateOperationAction(operation));;
    let task = new Task().setOperation(operation).setComponentType("form");
    store.dispatch(new PipelineCreateTaskAction(task));
    let tasks = store.select(state => 
      state.pipelineStorage
    )
    tasks.subscribe((data) => {
      console.log(data)
    })
    console.log("ssdsd");
  }

  // receive data from dialog input
  initialization() {
    this.isPipeline = this.data.isPipeline;
    this.genere = this.data.genere;
    this.isComposite = this.data.isComposite;
    this.type = this.data.type;
    this.category = this.data.category;

    this.uiComponent = UIComponentFactory.create(this.type);
  }

  // this function if for update componet tree structure for information tab
  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    console.log("tab change");
    console.log(tabChangeEvent);
    if (tabChangeEvent.tab.textLabel == "Check Status")
      this.infoTab.update();
    else if (tabChangeEvent.tab.textLabel == "Generate Pipeline")
      this.pipelineTab.update();
  }

  checkWizardStatus() {
    let openCorrect = true;
    let description = "";
    console.log("open wizard : check status");
    console.log(this)
    if (this.genere == "Genre" || this.genere == "")
      description += "You need to choose Genre\n";
    if (this.category == "Category" || this.category == "")
      description += "You need to choose Category\n";
    if (this.uiComponent == undefined)
      description += "You need to choose UI Component\n";

    console.log(description)
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
  }
}