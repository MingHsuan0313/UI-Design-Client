import { Injectable, ElementRef } from '@angular/core';
import { GraphStorage } from '../models/graph-storage.model';

@Injectable({
  providedIn: 'root'
})
export default class GraphEditorService {
  graphsStorage: GraphStorage[];
  graph: mxGraph;

  constructor() {
    this.graphsStorage = []
  }

  // argument : native html element reference (container)
  // return : void
  // function : create graph
  createGraph(element: ElementRef) {
    let graphStorage = new GraphStorage(element);
    this.graphsStorage.push(graphStorage);
    // this.inserVertex(0,'2',"Hello",200,250,300,100);
    // this.changeVertexValue(0,"2","adhsjahksahjsad")
  }

  inserVertex(graphIndex,vertexID,vertexValue,x,y,width,height) {
    this.graphsStorage[graphIndex].insertVertex(vertexID,vertexValue,x,y,width,height);
  }

  changeVertexValue(graphIndex,vertexID,newValue) {
    this.graphsStorage[graphIndex].changeVertexValue(vertexID,newValue);
  }

  inserEdge(graphIndex,sourceVertex,targetVertex) {
    this.graphsStorage[graphIndex].insertEdge(sourceVertex,targetVertex);
  }
}
