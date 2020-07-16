import { Injectable, ElementRef } from '@angular/core';
import { GraphStorage } from '../models/graph-storage.model';
import { fakeCard } from '../../fakedata/fakeCard';
import { fakeText } from '../../fakedata/fakeText';

@Injectable({
  providedIn: 'root'
})
export default class GraphEditorService {
  graphsStorage: GraphStorage[];
  selectedGraphID: string;

  constructor() {
    this.graphsStorage = []
  }

  // argument : native html element reference (container)
  // return : void
  // function : create graph
  createGraph(element: ElementRef) {
    let graphStorage = new GraphStorage(element,"graph" + this.graphsStorage.length.toString());
    this.graphsStorage.push(graphStorage);
    this.selectedGraphID = graphStorage.getID();
    //Cell click event
    // console.log(mxEvent)
    // console.log(this.graphsStorage[0].getGraph())

    // let vertex1 = this.inserVertex(0,"1", '2', "Hello", 200, 250, 300, 100);
    // let vertex2 = this.inserVertex(0,"2", '3', "Hello2", 200, 250, 300, 100);
    // let edge = this.inserEdge(0, "2", "3");

    // console.log("graph hereee")

    // console.log(this.graphsStorage[0].getGraph())
    // console.log("vertex hereee")
    // console.log(vertex1)
    // let parent = this.graphsStorage[0].getGraph().getDefaultParent()
    this.bindComponent(fakeCard,parent);
    this.bindComponent(fakeText,parent);
    // console.log("edge hereee")
    // console.log(edge)
    // this.changeVertexValue(0,"2","adhsjahksahjsad")
  }

  // object => svg
  bindComponent(component,parent){
    let graph = this.findGraphByID(this.selectedGraphID);
    graph.bindComponent(component,parent);
    // // this is basic component
    // if(component["key"] == undefined)
    // console.log("Bind Component");
    // console.log(component);
  }

  createCompoent(component) {
    
  }

  inserVertex(graphIndex, parent, vertexID, vertexValue, x, y, width, height,style) {
    return this.graphsStorage[graphIndex].insertVertex(parent,vertexID, vertexValue, x, y, width, height,style);
  }

  changeVertexValue(graphIndex, vertexID, newValue) {
    this.graphsStorage[graphIndex].changeVertexValue(vertexID, newValue);
  }

  inserEdge(graphIndex, sourceVertexID, targetVertexID) {
    let sourceVertexModel = this.graphsStorage[graphIndex].findVertexByID(sourceVertexID);
    let targetVertexModel = this.graphsStorage[graphIndex].findVertexByID(targetVertexID);
    return this.graphsStorage[graphIndex].insertEdge(sourceVertexModel.vertex, targetVertexModel.vertex);
  }

  findGraphByID(id) {
    for(let element of this.graphsStorage) {
      if(element.getID() == id)
        return element;
    }
  }
}
