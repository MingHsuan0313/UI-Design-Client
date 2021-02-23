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
import { SelabGraph } from 'src/app/models/externalRepresentation/selabGraph.model';
import { IRClearPageUICDLAction, IRDeletePageUICDLAction, IRInsertPageUICDLAction, IRRenamePageAction } from 'src/app/models/store/actions/internalRepresentation.action';
import {
  MatDialog,
  MatSnackBar,
  MatTabGroup,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { FormControl } from '@angular/forms';
import { pageUICDLSelector, uiComponentSelector } from 'src/app/models/store/selectors/InternalRepresentationSelector';
import { TabNameDialogComponent } from './tab-name-dialog/tab-name-dialog.component';
import { EdgeInformationDialogComponent } from './edge-information-dialog/egde-information-dialog.component';
import { vertexSelector } from 'src/app/models/store/selectors/ExternalRepresentationSelector';
import { SelabSettingComponent } from '../selab-setting/selab-setting.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../utils/confirm-dialog/confirm-dialog.component';
import { HttpClientService } from 'src/app/services/http-client.service';
import { HttpParams } from '@angular/common/http';
import ServiceComponentService from 'src/app/services/serviceComponent/service-component.service';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage';


@Component({
  selector: 'selab-graph-editor',
  templateUrl: './selab-graph-editor.component.html',
  styleUrls: ['./selab-graph-editor.component.scss']
})
export class SelabGraphEditorComponent implements AfterViewInit {
  selectedPageId: string;
  private zoomFactor = 1;
  public tabs: TabModel[] = [new TabModel("imsMain", "graphContainer-0")];
  selected = new FormControl(0);
  verticalPosition: MatSnackBarVerticalPosition = "top";
  pages: any[];
  @ViewChild("tabGroup") tabGroup: MatTabGroup;
  @Input() setting: SelabSettingComponent;
  constructor(private graphEditorService: GraphEditorService,
    private exportService: ExportService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public codeEditor: MatDialog,
    private serviceComponentService: ServiceComponentService
  ) {
    this.pages = [];
    setTimeout(() => {
      this.store.select(pageUICDLSelector())
        .subscribe((pageUICDLs) => {
          // this.pages = [{"name":"", "isMain":"", "id": ""}];
          this.pages = [];
          let keys = Object.keys(pageUICDLs);
          // console.log(keys);
          for (let index = 0; index < keys.length; index++) {
            let key = keys[index];
            let page = {
              "name": pageUICDLs[key].name,
              "isMain": pageUICDLs[key].isMain,
              "id": pageUICDLs[key].id
            }
            this.pages.push(page);
          }
        })
    }, 550)
  }

  ngAfterViewInit() {
  }

  showExternalRepresentation() {
    console.log(this.graphEditorService.getGraph());
    this.openSnackBar("show GraphModel in console", "display");
  }



  isModified(graphID: string) {
    return this.graphEditorService.isModified(graphID);
  }

  changeTabName(index: number) {
    // console.log("change tab name");
    this.openDialog(index);
  }

  openDialog(index) {
    if (this.pages[index].name == "imsMain")
      return;
    let currentTabName = this.pages[index];
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
        this.pages[index].name = result;
        this.store.dispatch(new IRRenamePageAction(id, result));
      }
    });
  }

  navigation() {
    console.log('do navigation');
    this.selected.setValue(0);
    this.graphEditorService.navigation();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: this.verticalPosition
    })
  }

  showInternalRepresentation() {
    console.log("show IR")
    let pageUICDLs = this.store.select(pageUICDLSelector());
    pageUICDLs.subscribe((data) => {
      let id = this.graphEditorService.getSelectedGraphID();
      console.log(data[id]);
      console.log(JSON.stringify(data[id]));
    })
    this.openSnackBar("show selected PageUICDL in console", "display");
  }

  showGlobalStorage() {
    console.log("show Global Storage");
    console.log(SelabGlobalStorage.getInfo());
    this.openSnackBar("show global storage in console", "display");
  }

  findUniquePageID() {
    for (let index = 0; index < this.tabs.length + 1; index++) {
      let id = "graphContainer-" + index.toString();
      const result = this.tabs.filter(tab => tab.graphID == id);
      // id is unique
      if (result.length == 0) {
        return id;
      }
    }
  }

  addPage() {
    // this.graphEditorService.createPage(`page${this.pages.length}`);
  }

  changePage(event) {
    // if(this.graphEditorService.inNavigation == true) {
    //   this.graphEditorService.clearGraphModel();
    //   this.graphEditorService.inNavigation = false;
    //   this.graphEditorService.getGraph().zoomIn();
    // }
    // console.log(`change page target_index = ${event['index']}`);
    // console.log(this.pages)
    // console.log(event)
    let index = event['index'] - 1;
    let currentPageId = this.graphEditorService.selectedPageId;
    if(this.pages[index] == undefined) {
      return;
    }
    if (this.pages[index].id == currentPageId)
      return
    else {
      let targetPageId = this.pages[index].id;
      this.graphEditorService.changePage(currentPageId, targetPageId);
    }
  }

  createGraph(elementId, isMain: boolean) {
    let element = document.getElementById(elementId);
    let newPageUICDL = new PageUICDL(elementId);
    newPageUICDL.isMain = isMain;
    Storage.setPageUICDL(newPageUICDL);
    // this.graphEditorService.createGraph(element);
    this.store.dispatch(new IRInsertPageUICDLAction(newPageUICDL));
    this.store.dispatch(new IRRenamePageAction(elementId, this.tabs[this.tabs.length - 1].name));
    this.graphEditorService.createEditor(element);
    this.configure();
    this.store.dispatch(new ERInsertGraphStorageAction(new SelabGraph(elementId)))
  }

  configure() {
    let graph = this.graphEditorService.getGraph()
    let graphID = this.graphEditorService.getSelectedGraphID();
    graph.extendParentsOnAdd = false;
    graph.constrainChildren = false;
    this.setting.configureStyleEditor(); 
    graph.addListener(mxEvent.CLICK, (sender, event) => {
      this.setting.clear();
      let selectedVertex = sender.selectionModel.cells[0];
      if (selectedVertex != undefined) {
        let vertexObservable = this.store.select(vertexSelector(graphID, selectedVertex.id));
        vertexObservable.subscribe((data) => {
          if (data != undefined) {
            let componentObservable = this.store.select(uiComponentSelector(graphID, data.uiComponentID));
            componentObservable.subscribe((component) => {
              if (component != undefined) {
                this.setting.update(component);
              }
              else
                console.log("component is undefined");
            })
          }
        })
      }
    })

    graph.addListener(mxEvent.DOUBLE_CLICK, (sender, event) => {
      let selectedVertex = sender.selectionModel.cells[0];
      if (selectedVertex == undefined)
        return;
      let componentID = selectedVertex["componentID"];
      let pageID = this.graphEditorService.getSelectedGraphID();
      console.log(`pageID = ${pageID}\ncomponentID = ${componentID}`);
      let uiComponentObservable = this.store.select(uiComponentSelector(pageID, componentID));
      uiComponentObservable.subscribe((data) => {
        let serviceID = data["serviceComponent"]["serviceID"];
        let className = data["serviceComponent"]["className"];
        // console.log(`selected ServiceID = ${serviceID}`);
        this.serviceComponentService.queryCodeByServiceID(serviceID)
          .subscribe((response) => {
            // console.log(response);
            let code = response["body"];
            let codeEditorRef = this.codeEditor.open(CodeEditorComponent, {
              width: '1250px',
              height: '850px',
              panelClass: 'code-editor-dialog',
              data: {
                code: code,
                className: className
              },
              disableClose: true,
              autoFocus: true
            })

            codeEditorRef.afterClosed().subscribe(result => {
              console.log("Code editor has been closed");
              console.log(result);
            })
          }, (error) => {
            console.log("This UIComponent doesn't bind to ServiceComponent")
          })
      })
    })

  
  }

  onTabChange(event) {
    let index = event.index;
    let graphID = this.tabs[index].graphID;
    this.graphEditorService.setSelectedEditor(graphID);
  }

  closePage(index) {
    console.log(`close page index = ${index}`);
    console.log(`current index = ${this.selected.value}`);
    console.log(this.pages);
    if (this.pages.length == 1)
      return;
    if (this.pages[index].name == "imsMain")
      return;
    let deletedGraphID = this.pages[index].id;
    this.store.dispatch(new ERDeleteGraphStorageAction(deletedGraphID));
    this.store.dispatch(new IRDeletePageUICDLAction(deletedGraphID));
    // console.log(`current index = ${this.tabGroup.selectedIndex}`);

    if (index == (this.selected.value - 1)) {
      console.log('close current page');
      // this.graphEditorService.setSelectedEditor(this.tabs[this.tabs.length - 1].graphID);
      // this.selected.setValue(index - 1);
      this.selected.setValue(index);
      this.changePage(index);
    }
  }
  zoomIn() {
    this.graphEditorService.zoomIn();
  }

  zoomOut() {
    this.graphEditorService.zoomOut();
  }


  ngOnInit() {
    // setTimeout(() => {
    //   this.createGraph("graphContainer-0",true);
    //   this.store.dispatch(new IRRenamePageAction("graphContainer-0","imsMain"))
    // },500)
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
    const message = `Are you sure you want to clear graph and pageUICDL?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        const graphModel = this.graphEditorService.getGraphModel();
        graphModel.clear();
        this.openSnackBar("clear both GraphStorage and PageUICDL", "clear");
        let graphID = this.graphEditorService.getSelectedGraphID();
        this.store.dispatch(new ERClearGraphStorageActition(graphID));
        this.store.dispatch(new IRClearPageUICDLAction(graphID));
      }
    })
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
  isModified: boolean;

  constructor(name: string, graphID: string) {
    this.name = name;
    this.graphID = graphID;
    this.isModified = false;
  }
}