import { Injectable, ElementRef } from '@angular/core';
import { GraphStorage } from '../models/graph-storage.model';
// import { fakeCardComposite } from '../../fakedata/fakeCardComposite';
import { fakeText } from '../../fakedata/fakeText';
import { fakeButton } from '../../fakedata/fakeButton';
import { fakeDropdown } from '../../fakedata/fakeDropdown';
import { fakeTable } from '../../fakedata/fakeTable';
import { fakeCardComposite } from '../../fakedata/fakeCardComposite';
import { UIComponent } from '../models/modelDependency';

@Injectable({
  providedIn: 'root'
})
export default class GraphEditorService {
  graphStorages: GraphStorage[];
  selectedGraphID: string;

  constructor() {
    this.graphStorages = []
  }

  // argument : native html element reference (container)
  // return : void
  // function : create graph
  createGraph(element) {
    let graphStorage = new GraphStorage(element, "graphContainer" + this.graphStorages.length.toString());
    this.graphStorages.push(graphStorage);
    this.selectedGraphID = graphStorage.getID();

    // this.bindComponent(fakeText)
    // this.bindComponent(fakeButton);
    // this.bindComponent(fakeDropdown);
    // this.bindComponent(fakeTable);
     this.bindComponent(fakeCardComposite);
  }

  // object => svg
  bindComponent(component:UIComponent, x?, y?) {
    if (x == undefined || y == undefined) {
      let graphStorage = this.findGraphByID(this.selectedGraphID);
      let parent = graphStorage.getGraph().getDefaultParent();
      graphStorage.createComponent(component, parent);
    }
    else {
      let graphStorage = this.findGraphByID(this.selectedGraphID);
      let parent = graphStorage.getGraph().getDefaultParent();
      graphStorage.createComponent(component, parent, x, y)
    }
  }

  findGraphByID(id) {
    for (let element of this.graphStorages) {
      if (element.getID() == id)
        return element;
    }
  }

  getGraphStorage() {
    let graphStorage = this.findGraphByID(this.selectedGraphID);
    return graphStorage;
  }

  syncStorage() {
    let graphStorage = this.findGraphByID(this.selectedGraphID);
    return graphStorage.syncStorage();
  }
}
