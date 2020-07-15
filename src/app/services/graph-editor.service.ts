import { Injectable, ElementRef } from '@angular/core';
import { GraphStorage } from '../models/graph-storage.model';

@Injectable({
  providedIn: 'root'
})
export default class GraphEditorService {
  graphsStorage: GraphStorage[];
  selectedGraphIndex: number;

  constructor() {
    this.graphsStorage = []
  }

  // argument : native html element reference (container)
  // return : void
  // function : create graph
  createGraph(element: ElementRef) {
    let graphStorage = new GraphStorage(element);
    this.graphsStorage.push(graphStorage);
    //Cell click event
    console.log(mxEvent)
    console.log(this.graphsStorage[0].getGraph())

    let vertex1 = this.inserVertex(0,"1", '2', "Hello", 200, 250, 300, 100);
    let vertex2 = this.inserVertex(0,"2", '3', "Hello2", 200, 250, 300, 100);
    // let edge = this.inserEdge(0, "2", "3");

    console.log("graph hereee")
    console.log(this.graphsStorage[0].getGraph())
    console.log("vertex hereee")
    console.log(vertex1)
    // console.log("edge hereee")
    // console.log(edge)
    // this.changeVertexValue(0,"2","adhsjahksahjsad")
  }

  // object => svg

  bindComponent(component){
    console.log("Bind Component");
    console.log(component);
  }

  inserVertex(graphIndex, parent, vertexID, vertexValue, x, y, width, height) {
    return this.graphsStorage[graphIndex].insertVertex(parent,vertexID, vertexValue, x, y, width, height);
  }

  changeVertexValue(graphIndex, vertexID, newValue) {
    this.graphsStorage[graphIndex].changeVertexValue(vertexID, newValue);
  }

  inserEdge(graphIndex, sourceVertexID, targetVertexID) {
    let sourceVertexModel = this.graphsStorage[graphIndex].findVertexByID(sourceVertexID);
    let targetVertexModel = this.graphsStorage[graphIndex].findVertexByID(targetVertexID);
    return this.graphsStorage[graphIndex].insertEdge(sourceVertexModel.vertex, targetVertexModel.vertex);
  }
}
