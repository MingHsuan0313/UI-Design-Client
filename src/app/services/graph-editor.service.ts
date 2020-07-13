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
    this.inserVertex(0,'1',"Hello",200,250,300,100);
    this.changeVertexValue(0,"1","adhsjahksahjsad")
    // console.log("Create Graph");
    // console.log(element);
    // let editor = new mxEditor();
    // let graphModel = new mxGraphModel();
    // this.graph = new mxGraph(element,graphModel);
    // console.log(this.graph)
    // console.log(mxEditor)
    // console.log(window.mxEditor)
    // console.log(window.mxUtils);
    // console.log(mxEditor)
    // console.log(mxUtils)
  }

  inserVertex(index,vertexID,vertexValue,x,y,width,height) {
    this.graphsStorage[index].insertVertex(vertexID,vertexValue,x,y,width,height);
  }

  changeVertexValue(index,vertexID,newValue) {
    this.graphsStorage[index].changeVertexValue(vertexID,newValue);
  }

  inserEdge(index,sourceVertex,targetVertex) {
    this.graphsStorage[index].insertEdge(sourceVertex,targetVertex);
  }
}
