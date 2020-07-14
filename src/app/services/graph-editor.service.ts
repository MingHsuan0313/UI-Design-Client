import { Injectable, ElementRef } from '@angular/core';
import { GraphStorage } from '../models/graph-storage.model';

@Injectable({
  providedIn: 'root'
})
export default class GraphEditorService {
  graphsStorage: GraphStorage[];

  constructor() {
    this.graphsStorage = []
  }

  // argument : native html element reference (container)
  // return : void
  // function : create graph
  createGraph(element: ElementRef) {
    let graphStorage = new GraphStorage(element);
    this.graphsStorage.push(graphStorage);
    this.inserVertex(0,'2',"Hello",200,250,300,100);
    this.inserVertex(0,'3',"Hello2",200,250,300,100);
    this.inserEdge(0,"2","3");
    // console.log(this.graphsStorage[0].getGraph())
    // this.changeVertexValue(0,"2","adhsjahksahjsad")
  }

  inserVertex(graphIndex,vertexID,vertexValue,x,y,width,height) {
    this.graphsStorage[graphIndex].insertVertex(vertexID,vertexValue,x,y,width,height);
  }

  changeVertexValue(graphIndex,vertexID,newValue) {
    this.graphsStorage[graphIndex].changeVertexValue(vertexID,newValue);
  }

  inserEdge(graphIndex,sourceVertexID,targetVertexID) {
    let sourceVertexModel = this.graphsStorage[graphIndex].findVertexByID(sourceVertexID);
    let targetVertexModel = this.graphsStorage[graphIndex].findVertexByID(targetVertexID);
    this.graphsStorage[graphIndex].insertEdge(sourceVertexModel.vertex,targetVertexModel.vertex);
  }
}
