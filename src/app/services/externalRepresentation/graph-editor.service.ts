import { Injectable, ElementRef } from "@angular/core";
import { fakeBreadcrumb } from "../../../fakedata/fakeBreadcrumb";
import { StyleLibrary } from "../../shared/styleLibrary";
import { Storage } from "../../shared/storage"
import { GraphStorage } from "../../models/graph-dependency";

@Injectable({
  providedIn: "root"
})
export default class GraphEditorService {
  graphStorages: GraphStorage[];
  selectedGraphID: string;
  selectedGraphStorage: GraphStorage;

  constructor() {
    this.graphStorages = [];
  }

  // argument : native html element reference (container)
  // return : void
  // function : create graph
  createGraph(element: HTMLElement) {
    this.selectedGraphStorage = new GraphStorage(element, "graphContainer" + this.graphStorages.length.toString());
    this.graphStorages.push(this.selectedGraphStorage);
    this.selectedGraphID = this.selectedGraphStorage.getID();
    Storage.createPageUICDL();
    // this.bindComponent(fakeBreadcrumb);
  }

  // object => svg
  // possible to have x y ?
  bindComponent(component, x?, y?) {
    if (x === undefined || y === undefined) {
      const parent = this.selectedGraphStorage.getGraph().getDefaultParent();
      this.selectedGraphStorage.createComponent(component, parent);
    } else {
      const parent = this.selectedGraphStorage.getGraph().getDefaultParent();
      this.selectedGraphStorage.createComponent(component, parent, x, y);
    }
  }


  getGraphStorage() {
    return this.selectedGraphStorage;
  }

  syncStorage() {
    this.selectedGraphStorage.syncStorage();
  }

  syncMxCells() {
    this.selectedGraphStorage.syncMxCells();
  }

  addArrow() {

  }

  zoomTo(zoomFactor:any){
    this.selectedGraphStorage.zoomTo(zoomFactor);
  }

  getMaxVertexID(){
    return this.getGraphStorage().getMaxID();
  }

  
  
}
