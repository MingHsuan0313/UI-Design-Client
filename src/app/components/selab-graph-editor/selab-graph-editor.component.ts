// import { Component, OnInit } from '@angular/core';
import { AfterViewInit, Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import GraphEditorService from '../../services/externalRepresentation/graph-editor.service';
import * as html2canvas from 'html2canvas';
import ImportService from '../../services/internalRepresentation/import.service';
import ExportService from '../../services/internalRepresentation/export.service';
import { Storage } from '../../shared/storage';
import { StyleLibrary } from '../../shared/styleLibrary';
import { PageUICDL } from 'src/app/models/internalRepresentation/pageUICDL.model';
import { AppState } from 'src/app/models/store/app.state';
import { Store } from '@ngrx/store';
import { ERClearGraphStorageActition, ERDeleteGraphStorageAction, ERInsertGraphStorageAction } from 'src/app/models/store/actions/externalRepresentation.action';
import { SelabGraph } from 'src/app/models/store/selabGraph.model';
import { IRClearPageUICDLAction, IRDeletePageUICDLAction, IRInsertPageUICDLAction, IRRenamePageAction } from 'src/app/models/store/actions/internalRepresentation.action';
import { MatDialog, MatIconRegistry, MatSnackBar, MatTabGroup } from '@angular/material';
import { FormControl } from '@angular/forms';
import { pageUICDLSelector, uiComponentSelector } from 'src/app/models/store/reducers/InternalRepresentationSelector';
import { TabNameDialogComponent } from './tab-name-dialog/tab-name-dialog.component';
import { ComponentInfoComponent } from '../selab-setting/component-info/component-info.component';
import { vertexSelector } from 'src/app/models/store/reducers/ExternalRepresentationSelector';
import { SelabSettingComponent } from '../selab-setting/selab-setting.component';

@Component({
  selector: 'selab-graph-editor',
  templateUrl: './selab-graph-editor.component.html',
  styleUrls: ['./selab-graph-editor.component.scss']
})
export class SelabGraphEditorComponent implements AfterViewInit {
  private zoomFactor = 1;
  public tabs: TabModel[] = [new TabModel("page0", "graphContainer-0")];
  selected = new FormControl(0);
  @ViewChild("tabGroup") tabGroup: MatTabGroup;
  @Input() setting: SelabSettingComponent;
  //imageCount = 1;
  constructor(private graphEditorService: GraphEditorService,
    private exportService: ExportService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  ngAfterViewInit() {
  }

  showExternalRepresentation() {
    console.log(this.graphEditorService.getGraphModel());
    this.openSnackBar("show GraphModel in console", "display");
  }

  changeTabName(index: number) {
    console.log("change tab name");
    this.openDialog(index);
  }

  openDialog(index) {
    let currentTabName = this.tabs[index];
    let data = {
      tabName: currentTabName
    };
    const dialogRef = this.dialog.open(TabNameDialogComponent, {
      // width:'20%' ,
      // height: '25%',
      data: data,
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      let id = this.graphEditorService.getSelectedGraphID();
      console.log("new Tabname " + result);
      if ((result as string).length != 0) {
        this.tabs[index].name = result;
        this.store.dispatch(new IRRenamePageAction(id, result));
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }

  showInternalRepresentation() {
    console.log("show IR")
    let pageUICDLs = this.store.select(pageUICDLSelector());
    pageUICDLs.subscribe((data) => {
      let id = this.graphEditorService.getSelectedGraphID();
      console.log(data[id]);
    })
    this.openSnackBar("show selected PageUICDL in console", "display");
  }

  findUniquePageID() {
    for (let index = 0; index < this.tabs.length + 1; index++) {
      let id = "graphContainer-" + index.toString();
      const result = this.tabs.filter(tab => tab.graphID == id);
      console.log("heree")
      console.log(result)
      // id is unique
      if (result.length == 0) {
        return id;
      }
    }
  }

  addPage() {
    let graphID = `${this.findUniquePageID()}`

    let pageID = parseInt(graphID.split('-')[1]);
    this.tabs.push(new TabModel(`page-${pageID}`, graphID));
    this.selected.setValue(this.tabs.length - 1);

    setTimeout(() => {
      this.createGraph(graphID);
      this.graphEditorService.setSelectedEditor(graphID);
    }
      , 500);
  }

  createGraph(elementId) {
    let element = document.getElementById(elementId);
    let newPageUICDL = new PageUICDL(elementId);
    Storage.setPageUICDL(newPageUICDL);
    // this.graphEditorService.createGraph(element);
    this.store.dispatch(new IRInsertPageUICDLAction(newPageUICDL));
    this.graphEditorService.createEditor(element);
    this.configure();
    this.store.dispatch(new ERInsertGraphStorageAction(new SelabGraph(elementId)))
  }

  configure() {
    let graph = this.graphEditorService.getGraph()
    let graphID = this.graphEditorService.getSelectedGraphID();
    graph.addListener(mxEvent.CLICK, (sender, event) => {
      this.setting.clear();
      let selectedVertex = sender.selectionModel.cells[0];
      console.log('grpah being click')
      console.log(graphID)
      console.log('vertex being click');
      if(selectedVertex != undefined) {
        
        console.log(selectedVertex.id);
        let vertexObservable = this.store.select(vertexSelector(graphID,selectedVertex.id));
        vertexObservable.subscribe((data) => {
          console.log(data);
          let componentObservable = this.store.select(uiComponentSelector(graphID,data.uiComponentID));
          componentObservable.subscribe((component) => {
            if(component != undefined) {
              console.log(component);
              console.log(component.getInfo());
              this.setting.update(component);
            }
            else
              console.log("component is undefined");
          })
        })
      }
    })
  }

  onTabChange(event) {
    let index = event.index;
    let graphID = this.tabs[index].graphID;
    this.graphEditorService.setSelectedEditor(graphID);
  }

  closePage(index) {
    if (this.tabs.length == 1)
      return;
    if (index == this.tabGroup.selectedIndex) {
      let deletedGraphID = this.tabs[index].graphID;
      this.store.dispatch(new ERDeleteGraphStorageAction(deletedGraphID));
      this.store.dispatch(new IRDeletePageUICDLAction(deletedGraphID));
      this.tabs.splice(index, 1);
      this.graphEditorService.setSelectedEditor(this.tabs[this.tabs.length - 1].graphID);
      this.selected.setValue(this.tabs.length - 1);
    }
    else
      this.tabs.splice(index, 1);
  }
  zoomIn() {
    this.zoomFactor = this.zoomFactor * 1.11;
    this.graphEditorService.zoomTo(this.zoomFactor);
  }

  zoomOut() {
    this.zoomFactor = this.zoomFactor * 0.9;
    this.graphEditorService.zoomTo(this.zoomFactor);
  }


  ngOnInit() {
    setTimeout(() =>
      this.createGraph("graphContainer-0"), 500);
    // this.addPage(),500);
  }

  saveAs(uri, filename) {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;
      //Firefox requires the link to be in the body
      document.body.appendChild(link);
      //simulate click
      link.click();
      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  }

  convertToCanvas() {
    let elementID = this.graphEditorService.selectedGraphID;
    let element = document.getElementById(elementID);
    let originalThis = this;
    html2canvas(element).then(function (canvas) {
      originalThis.saveAs(canvas.toDataURL(), 'file-name.png');
    });
  }

  clearGraph() {
    const graphModel = this.graphEditorService.getGraphModel();
    graphModel.clear();
    this.openSnackBar("clear both GraphStorage and PageUICDL", "clear");
    let graphID = this.graphEditorService.getSelectedGraphID();
    this.store.dispatch(new ERClearGraphStorageActition(graphID));
    this.store.dispatch(new IRClearPageUICDLAction(graphID));
  }

  newProject() {
    this.exportService.newProject().subscribe(
      response => console.log(response['body'])
    );
  }

  increaseFont() {
    StyleLibrary[0]['fontSize'] += 10;
  }

  decreaseFont() {
    StyleLibrary[0]['fontSize'] -= 10;
  }

}

export class TabModel {
  name: string;
  graphID: string;

  constructor(name: string, graphID: string) {
    this.name = name;
    this.graphID = graphID;
  }
}

