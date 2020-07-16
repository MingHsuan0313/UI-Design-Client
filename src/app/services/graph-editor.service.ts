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
  createGraph(element) {
    let graphStorage = new GraphStorage(element,"graphContainer" + this.graphsStorage.length.toString());
    this.graphsStorage.push(graphStorage);
    this.selectedGraphID = graphStorage.getID();

    this.bindComponent(fakeText);
  }

  // object => svg
  bindComponent(component){
    let graph = this.findGraphByID(this.selectedGraphID);
    let parent = graph.getGraph().getDefaultParent();
    graph.createComponent(component,parent);
    // // this is basic component
    // if(component["key"] == undefined)
    // console.log("Bind Component");
    // console.log(component);
  }

  findGraphByID(id) {
    for(let element of this.graphsStorage) {
      if(element.getID() == id)
        return element;
    }
  }
}
