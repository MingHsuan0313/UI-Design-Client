import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class GraphEditorService {
  graph: mxGraph;

  constructor() { }

  createGraph(element: ElementRef) {

    console.log("Create Graph");
    console.log(element);
    this.graph = new mxGraph(element);
    try {
      const parent = this.graph.getDefaultParent();
      this.graph.getModel().beginUpdate();

      const vertex1 = this.graph.insertVertex(parent, '1', 'Vertex 1', 0, 0, 200, 80);
      const vertex2 = this.graph.insertVertex(parent, '2', 'Vertex 2', 0, 0, 200, 80);

      this.graph.insertEdge(parent, '', '', vertex1, vertex2);
    } finally {
      this.graph.getModel().endUpdate();
      new mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
    }
  }
}
