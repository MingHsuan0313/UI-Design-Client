// import { Component, OnInit } from '@angular/core';
import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import GraphEditorService from '../../services/externalRepresentation/graph-editor.service';
import * as html2canvas from 'html2canvas';
import ImportService from '../../services/internalRepresentation/import.service';
import ExportService from '../../services/internalRepresentation/export.service';
import { Storage } from '../../shared/storage';
import { StyleLibrary } from '../../shared/styleLibrary';
import { PageUICDL } from 'src/app/models/internalRepresentation/pageUICDL.model';
import { AppState } from 'src/app/models/store/app.state';
import { Store } from '@ngrx/store';
import { ERInitializationAction } from 'src/app/models/store/actions/externalRepresentation.action';
import { SelabGraph } from 'src/app/models/store/selabGraph.model';
import { IRInitializePageUICDLAction } from 'src/app/models/store/actions/internalRepresentation.action';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'selab-graph-editor',
  templateUrl: './selab-graph-editor.component.html',
  styleUrls: ['./selab-graph-editor.component.scss']
})
export class SelabGraphEditorComponent implements AfterViewInit {
  private zoomFactor = 1;
  //imageCount = 1;
  constructor(private graphEditorService: GraphEditorService,
    private exportService: ExportService,
    private store: Store<AppState>,
  ) {
  }

  ngAfterViewInit() {
  }

  showExternalRepresentation() {
    console.log(this.graphEditorService.getGraphModel());
  }

  showInternelRepresentation() {
    console.log(Storage.getPageUICDL());
    console.log(JSON.stringify(Storage.getPageUICDL()))
  }

  createGraph(elementId) {
    let element = document.getElementById(elementId);
    let pageID = parseInt(elementId.split('-')[1]);
    let newPageUICDL = new PageUICDL(pageID);
    Storage.setPageUICDL(newPageUICDL);
    // this.graphEditorService.createGraph(element);
    this.store.dispatch(new IRInitializePageUICDLAction(newPageUICDL));
    this.graphEditorService.createEditor(element);
    this.store.dispatch(new ERInitializationAction(new SelabGraph(elementId)))
  }

  ngOnInit() {
    this.createGraph('graphContainer-0');
    console.log('Create graph editor');
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
    const graphModel = this.graphEditorService.getGraphStorage().getGraphModel();
    graphModel.clear();
    this.graphEditorService.getGraphStorage().clear();
    Storage.clearTemp();
  }


  newPage() {
    Storage.isNewPage = true;
    this.graphEditorService.getGraphStorage().clear();
    this.clearGraph();
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

  zoomIn() {
    this.zoomFactor = this.zoomFactor * 1.11;
    this.graphEditorService.zoomTo(this.zoomFactor);
  }

  zoomOut() {
    this.zoomFactor = this.zoomFactor * 0.9;
    this.graphEditorService.zoomTo(this.zoomFactor);
  }
}


