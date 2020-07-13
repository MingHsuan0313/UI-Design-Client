// import { Component, OnInit } from '@angular/core';
import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import GraphEditorService from '../../services/graph-editor.service';

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

  ngOnInit() {
  }


}
