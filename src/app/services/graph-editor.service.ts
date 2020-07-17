import { Injectable, ElementRef } from '@angular/core';
import { GraphStorage } from '../models/graph-storage.model';
import { fakeCard } from '../../fakedata/fakeCard';
import { fakeText } from '../../fakedata/fakeText';
import { fakeButton } from '../../fakedata/fakeButton';

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
    let graphStorage = new GraphStorage(element, "graphContainer" + this.graphsStorage.length.toString());
    this.graphsStorage.push(graphStorage);
    this.selectedGraphID = graphStorage.getID();

    this.bindComponent(fakeText);
    this.bindComponent(fakeButton)
    // setTimeout(() => {
      // this.bindComponent(fakeButton)},8000)
  }

  // object => svg
  bindComponent(component, x?, y?) {
    if (x == undefined || y == undefined) {
      let graph = this.findGraphByID(this.selectedGraphID);
      let parent = graph.getGraph().getDefaultParent();
      graph.createComponent(component, parent);
    }
    else {
      let graph = this.findGraphByID(this.selectedGraphID);
      let parent = graph.getGraph().getDefaultParent();
      graph.createComponent(component, parent,x,y)
    }
  }

  findGraphByID(id) {
    for (let element of this.graphsStorage) {
      if (element.getID() == id)
        return element;
    }
  }
}
