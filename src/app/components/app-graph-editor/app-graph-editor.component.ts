// import { Component, OnInit } from '@angular/core';
import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import GraphEditorService from '../../services/graph-editor.service';
import * as html2canvas from 'html2canvas';
import ImportService from '../../services/import.service';
import {Storage} from '../../shared/storage';
import ExportService from '../../services/export.service';
import {StyleStorage} from '../../models/style-storage.model';
import {StyleLibrary} from '../../shared/styleLibrary';

@Component({
  selector: 'app-graph-editor',
  templateUrl: './app-graph-editor.component.html',
  styleUrls: ['./app-graph-editor.component.scss']
})
export class AppGraphEditorComponent implements AfterViewInit {


  constructor(private graphEditorService: GraphEditorService, private exportService: ExportService) {
  }

  // @ViewChild('graphContainer') graphContainer: ElementRef;

  ngAfterViewInit() {
    this.createGraph('graphContainer0');
    console.log('Create graph editor');
    // this.graphEditorService.createGraph(this.graphContainer.nativeElement);
  }

  showExternalRepresentation() {
    console.log(this.graphEditorService.getGraphStorage());
  }

  createGraph(elementId) {
    let element = document.getElementById(elementId);
    this.graphEditorService.createGraph(element);
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
    let elementID = this.graphEditorService.selectedGraphID;
    let element = document.getElementById(elementID);
    let originalThis = this;
    html2canvas(element).then(function (canvas) {
      // console.log(canvas);
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
      response => console.log(response["body"])
    );
  }

  increaseFont() {
    StyleLibrary[0]["fontSize"] += 10;
  }

  decreaseFont() {
    StyleLibrary[0]["fontSize"] -= 10;
  }

}
