// import { Component, OnInit } from '@angular/core';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import GraphEditorService from '../../services/graph-editor.service';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-graph-editor',
  templateUrl: './app-graph-editor.component.html',
  styleUrls: ['./app-graph-editor.component.scss']
})
export class AppGraphEditorComponent implements AfterViewInit {

  constructor(private graphEditorService: GraphEditorService) {
  }

  @ViewChild('graphContainer') graphContainer: ElementRef;

  ngAfterViewInit() {
    this.graphEditorService.createGraph(this.graphContainer.nativeElement);
  }

  createGraph(elementId) {
    let element = document.getElementById(elementId);
    this.graphEditorService.createGraph(element);
  }

  ngOnInit() {
  } 

  saveAs(uri, filename) {
    console.log("adjshakjd")
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
    elementID = 'graphContainer';
    let element = document.getElementById(elementID)
    console.log("convertttt")
    console.log(element)
    let temp = this;
    html2canvas(element).then(function (canvas) {
      // console.log("adhsdj")
      console.log(canvas);
      temp.saveAs(canvas.toDataURL(), 'file-name.png');
    });

  }





}
