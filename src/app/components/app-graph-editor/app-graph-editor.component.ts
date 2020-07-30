// import { Component, OnInit } from '@angular/core';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import GraphEditorService from '../../services/graph-editor.service';
import * as html2canvas from 'html2canvas';
import ImportService from '../../services/import.service';

@Component({
  selector: 'app-graph-editor',
  templateUrl: './app-graph-editor.component.html',
  styleUrls: ['./app-graph-editor.component.scss']
})
export class AppGraphEditorComponent implements AfterViewInit {



  constructor(private graphEditorService: GraphEditorService) {
  }

  // @ViewChild('graphContainer') graphContainer: ElementRef;

  ngAfterViewInit() {
    this.createGraph("graphContainer0");
    console.log("Create graph editor");
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
    let element = document.getElementById(elementID)
    let originalThis = this;
    html2canvas(element).then(function (canvas) {
      // console.log(canvas);
      originalThis.saveAs(canvas.toDataURL(), 'file-name.png');
    });
  }





}
