import {Injectable, ElementRef} from "@angular/core";
import {GraphStorage} from "../models/graph-storage.model";
import {fakeBreadcrumb} from "../../fakedata/fakeBreadcrumb"

@Injectable({
  providedIn: "root"
})
export default class GraphEditorService {
  graphStorages: GraphStorage[];
  selectedGraphID: string;
  graphStorage: GraphStorage;

  constructor() {
    this.graphStorages = [];
  }

  // argument : native html element reference (container)
  // return : void
  // function : create graph
  createGraph(element) {
    this.graphStorage = new GraphStorage(element, "graphContainer" + this.graphStorages.length.toString());
    this.graphStorages.push(this.graphStorage);
    this.selectedGraphID = this.graphStorage.getID();
    //this.bindComponent(fakeBreadcrumb);
  } 

  // object => svg
  // possible to have x y ?
  bindComponent(component, x?, y?) {
    if (x === undefined || y === undefined) {
      const parent = this.graphStorage.getGraph().getDefaultParent();
      this.graphStorage.createComponent(component, parent);
    } else {
      const parent = this.graphStorage.getGraph().getDefaultParent();
      this.graphStorage.createComponent(component, parent, x, y);
    }
  }


  getGraphStorage() {
    return this.graphStorage;
  }

  syncStorage() {
    this.graphStorage.syncStorage();
  }
}
