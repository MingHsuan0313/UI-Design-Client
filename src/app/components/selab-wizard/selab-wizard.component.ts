import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { PipelineCreateOperationAction, PipelineCreateTaskAction } from 'src/app/models/store/actions/pipelineTask.action';
import { AppState } from 'src/app/models/store/app.state';
import { ServiceComponentModel } from 'src/app/models/service-component-dependency';
import { UIComponentBuilder } from 'src/app/components/selab-wizard/UIComponentBuilder';
import { SelabHeaderComponent } from '../selab-header/selab-header.component';
import { BindServiceTabComponent } from './bind-service-tab/bind-service-tab.component';
import { BuildTabComponent } from './build-tab/build-tab.component';
import { ComposeTabComponent } from './compose-tab/compose-tab.component';
import { InformationTabComponent } from './information-tab/information-tab.component';
import { PipelineTabComponent } from './pipeline-tab/pipeline-tab.component';
import { UIComponentFactory } from './uicomponent-factory';
import GraphEditorService from 'src/app/services/externalRepresentation/graph-editor.service';
import { ReturnDataMenuComponent } from './return-data-menu/return-data-menu.component';
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage';

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
  uiComponentBuilder: UIComponentBuilder;
  lastTab: string;

  // it has return data if in pipeline mode
  operation: ServiceComponentModel;
  @ViewChild("returnDataMenu") returnDataMenu: ReturnDataMenuComponent;
  @ViewChild("selabtabs") tabGroup: MatTabGroup;
  @ViewChild("build") buildTab: BuildTabComponent;
  @ViewChild("compose") composeTab: ComposeTabComponent;
  @ViewChild("status") infoTab: InformationTabComponent;
  @ViewChild("pipeline") pipelineTab: PipelineTabComponent;
  @ViewChild("service") serviceTab: BindServiceTabComponent

  constructor(
    private graphEditorService: GraphEditorService,
    public dialogRef: MatDialogRef<SelabHeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    store: Store<AppState>
  ) {
  }

  // receive data from dialog input
  initialization() {
    console.log(SelabGlobalStorage.taskGraph);
    this.isPipeline = this.data.isPipeline;
    this.genere = this.data.genere;
    this.isComposite = this.data.isComposite;
    this.type = this.data.type;
    this.category = this.data.category;
    this.uiComponentBuilder = UIComponentFactory.create(this.type, pageId);
    if (this.isPipeline) {
      this.uiComponentBuilder.setReturnData(this.data.retutnData);
    }
    let pageId = this.graphEditorService.selectedPageId;
  }

  // this function if for update componet tree structure for information tab
  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    if(tabChangeEvent.tab.textLabel == "Check Status")
      this.infoTab.update();
    if(tabChangeEvent.tab.textLabel == "Generate Pipeline")
      this.pipelineTab.update();
    this.lastTab = tabChangeEvent.tab.textLabel;
  }

  checkWizardStatus() {
    let description = "";

    if (this.genere == "Genre" || this.genere == "")
      description += "You need to choose Genre\n";
    if (this.category == "Category" || this.category == "")
      description += "You need to choose Category\n";
    if (this.uiComponentBuilder == undefined)
      description += "You need to choose UI Component\n";

    if (description.length > 0) {
      this.dialogRef.close();
      alert(description);
      return false;
    }
    return true;
  }

  checkUIComponent() {
  }

  ngOnInit() {
    console.log("initilize")
    console.log(this.data);
    this.initialization();
    if (!this.checkWizardStatus())
      return;

    // composite component
    if (this.data.isComposite) {
      this.tabs = ["Build Component", "Compose Component",  "Bind Service", "Check Status", "Generate Pipeline"];
    }
    // basic component
    else {
      this.tabs = ["Build Component", "Check Status"];
    }

    this.lastTab = this.tabs[0];
    // this.returnDataMenu.render([
    //   {
    //     name:"code"
    //   },
    //   {
    //     name: "tag"
    //   },
    //   {
    //     name: "description"
    //   },
    //   {
    //     name: "id"
    //   }
    // ])
  }
}