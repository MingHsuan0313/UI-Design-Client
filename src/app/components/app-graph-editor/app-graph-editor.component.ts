// import { Component, OnInit } from '@angular/core';
import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-graph-editor',
  templateUrl: './app-graph-editor.component.html',
  styleUrls: ['./app-graph-editor.component.scss']
})
export class AppGraphEditorComponent implements AfterViewInit {
  
  @ViewChild('graphContainer') graphContainer: ElementRef;

  ngAfterViewInit() {
    const graph = new mxGraph(this.graphContainer.nativeElement);

    try {
      const parent = graph.getDefaultParent();
      graph.getModel().beginUpdate();

      const vertex1 = graph.insertVertex(parent, '1', 'Vertex 1', 0, 0, 200, 80);
      const vertex2 = graph.insertVertex(parent, '2', 'Vertex 2', 0, 0, 200, 80);

      graph.insertEdge(parent, '', '', vertex1, vertex2);
    } finally {
      graph.getModel().endUpdate();
      new mxHierarchicalLayout(graph).execute(graph.getDefaultParent());
    }
  }


}
