import {Injectable, ElementRef} from "@angular/core";
import {fakeBreadcrumb} from "../../fakedata/fakeBreadcrumb";
import {StyleLibrary} from "../shared/styleLibrary";
import {Storage} from '../shared/storage'
import { GraphStorage } from "../models/graph-dependency";

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
    Storage.createPageUICDL();
    // this.bindComponent(fakeBreadcrumb);
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

  syncMxCells() {
    this.graphStorage.syncMxCells();
  }

  addArrow() {

  }

  zoomTo(zoomFactor:any){
    this.graphStorage.zoomTo(zoomFactor);
  }

  getMaxID(){
    return this.getGraphStorage().getMaxID();
  }

  
  
}
