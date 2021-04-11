// import { Component, OnInit } from '@angular/core';
import { AfterViewInit, Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import GraphEditorService from '../../services/externalRepresentation/graph-editor.service';
import * as html2canvas from 'html2canvas';

import LoadService from '../../services/internalRepresentation/Load.service';
import SaveServie from '../../services/internalRepresentation/save.service';
import { StyleLibrary } from '../../shared/styleLibrary';
import { AppState } from 'src/app/models/store/app.state';
import { Store } from '@ngrx/store';
import { ERClearGraphStorageActition, ERDeleteGraphStorageAction, ERInsertGraphStorageAction } from 'src/app/models/store/actions/externalRepresentation.action';
import { IRClearPageUICDLAction, IRDeletePageUICDLAction, IRInsertPageUICDLAction, IRRenamePageAction } from 'src/app/models/store/actions/internalRepresentation.action';
import {
  MatDialog,
  MatSnackBar,
  MatSnackBarVerticalPosition
} from '@angular/material';
import { pageUICDLSelector, uiComponentSelector } from 'src/app/models/store/selectors/InternalRepresentationSelector';
import { vertexSelector } from 'src/app/models/store/selectors/ExternalRepresentationSelector';
import { SelabSettingComponent } from '../selab-setting/selab-setting.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../utils/confirm-dialog/confirm-dialog.component';
import ServiceComponentService from 'src/app/services/serviceComponent/service-component.service';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage';
import { Router } from '@angular/router';


@Component({
  selector: 'selab-graph-editor',
  templateUrl: './selab-graph-editor.component.html',
  styleUrls: ['./selab-graph-editor.component.scss']
})
export class SelabGraphEditorComponent implements AfterViewInit {
  selectedPageId: string;
  private zoomFactor = 1;
  verticalPosition: MatSnackBarVerticalPosition = "top";
  @Input() setting: SelabSettingComponent;
  constructor(private graphEditorService: GraphEditorService,
    private saveService: SaveServie,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public codeEditor: MatDialog,
    private router: Router,
    private serviceComponentService: ServiceComponentService
  ) {
  }

  navigationToBPEL() {
    this.router.navigate(['bpel']);
  }

  ngAfterViewInit(): void {
  }

  showExternalRepresentation() {
    console.log(this.graphEditorService.getGraph());
    this.openSnackBar("show GraphModel in console", "display");
  }

  navigation(flag: string) {
    console.log('do navigation');

    this.graphEditorService.navigation(flag);
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
    let subscription = pageUICDLs.subscribe((data) => {
      let id = this.graphEditorService.getSelectedPageId();
      console.log(data[id]);
      console.log(JSON.stringify(data[id]));
    })
    subscription.unsubscribe();
    this.openSnackBar("show selected PageUICDL in console", "display");
  }

  showNDL(){

  }

  showGlobalStorage() {
    console.log("show Global Storage");
    console.log(SelabGlobalStorage.getInfo());
    this.openSnackBar("show global storage in console", "display");
  }

  configure() {
    let graph = this.graphEditorService.getGraph()
    let graphID = this.graphEditorService.getSelectedPageId();
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
      let pageID = this.graphEditorService.getSelectedPageId();
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

  zoomIn() {
    this.graphEditorService.zoomIn();
  }

  zoomOut() {
    this.graphEditorService.zoomOut();
  }

  ngOnInit() {
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
    let element = document.getElementById("graph-container");
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
        let graphID = this.graphEditorService.getSelectedPageId();
        this.store.dispatch(new ERClearGraphStorageActition(graphID));
        this.store.dispatch(new IRClearPageUICDLAction(graphID));
      }
    })
  }

  newProject() {
    this.saveService.newProject().subscribe(
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