import { Injectable, ElementRef } from '@angular/core';
import { GraphStorage } from '../models/graph-storage.model';
import { fakeCardComposite } from '../../fakedata/fakeCardComposite';
import { fakeText } from '../../fakedata/fakeText';
import { fakeButton } from '../../fakedata/fakeButton';
import { fakeDropdown } from '../../fakedata/fakeDropdown';
import { fakeTable } from '../../fakedata/fakeTable';

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


    // this.bindComponent(fakeText);
    // this.bindComponent(fakeButton);
    this.bindComponent(fakeDropdown);
    // this.bindComponent(fakeTable);

    // this.bindComponent(fakeCardComposite);
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

  getGraph() {
    let graphStorage = this.findGraphByID(this.selectedGraphID);
    return graphStorage;
  }
}
