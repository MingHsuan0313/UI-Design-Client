// import { Component, OnInit } from '@angular/core';
import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import GraphEditorService from '../../services/externalRepresentation/graph-editor.service';
import * as html2canvas from 'html2canvas';
import ImportService from '../../services/internalRepresentation/import.service';
import ExportService from '../../services/internalRepresentation/export.service';
import { Storage } from '../../shared/storage';
import { StyleLibrary } from '../../shared/styleLibrary';
import { PageUICDL } from 'src/app/models/internalRepresentation/pageUICDL.model';

@Component({
  selector: 'app-graph-editor',
  templateUrl: './app-graph-editor.component.html',
  styleUrls: ['./app-graph-editor.component.scss']
})
export class AppGraphEditorComponent implements AfterViewInit {
  private zoomFactor = 1;
  //imageCount = 1;
  constructor(private graphEditorService: GraphEditorService, private exportService: ExportService) {
  }

  // @ViewChild('graphContainer') graphContainer: ElementRef;

  getModified() {
    // return true;
    return this.graphEditorService.getGraphStorage().getModified();
  }

  ngAfterViewInit() {
  }

  showExternalRepresentation() {
    console.log(this.graphEditorService.getGraphStorage());
  }

  showInternelRepresentation() {
    console.log(Storage.getPageUICDL());
    console.log(JSON.stringify(Storage.getPageUICDL()))
  }

  createGraph(elementId) {
    let element = document.getElementById(elementId);
    this.graphEditorService.createGraph(element);
  }

  ngOnInit() {
    this.createGraph('graphContainer0');
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


