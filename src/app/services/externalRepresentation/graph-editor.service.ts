import { Injectable, ElementRef } from "@angular/core";
import { Storage } from "../../shared/storage"
import { GraphStorage } from "../../models/graph-dependency";
import { PageUICDL } from "src/app/models/internalRepresentation/pageUICDL.model";
import StyleEditorService from "./style-editor.service";
import { StyleConverter } from "../../shared/styleTable";
import { AppState } from "src/app/models/store/app.state";
import { Action, Store } from "@ngrx/store";
import { IRInitializePageUICDLAction } from "src/app/models/store/actions/internalRepresentation.action";
import { ERInitializationAction, ERTestAction } from "src/app/models/store/actions/externalRepresentation.action";
import { Configuration } from "./util/configuration";
import { SelabEditor } from "src/app/models/externalRepresentation/selab-editor.model";

@Injectable({
  providedIn: "root"
})
export default class GraphEditorService {
  graphStorages: GraphStorage[];
  selectedGraphID: string;
  selectedGraphStorage: GraphStorage;

  editors: Map<string,SelabEditor>;
  selectedEditor: SelabEditor;

  constructor(private styleEditorService: StyleEditorService,
    private store: Store<AppState> 
    ) {
    this.graphStorages = [];
    this.editors = new Map();
  }
  
  createEditor(element: HTMLElement) {
    let editor = new SelabEditor(element,this.store);
    console.log("craete editor")
    console.log(editor)
    this.editors.set(Object.keys(this.editors).length.toString(),editor);
    this.selectedEditor = editor;
  }
  
  getGraph(): mxGraph {
    return this.selectedEditor.getGraph();
  }
  
  getGraphModel(): mxGraphModel {
    return this.selectedEditor.getGraphModel();
  }
  
  getGraphView(): mxGraphView {
    return this.selectedEditor.getGraphView();
  }

  createGraph(element: HTMLElement) {
    this.selectedGraphStorage = new GraphStorage(element, "graphContainer" + this.graphStorages.length.toString(),this.store);
    this.graphStorages.push(this.selectedGraphStorage);
    this.selectedGraphID = this.selectedGraphStorage.getID();
    let pageID = "page" + this.selectedGraphID;
  }

  bindComponent(component, x?, y?) {
    if (x === undefined || y === undefined) {
      // const parent = this.selectedGraphStorage.getGraph().getDefaultParent();
      // this.selectedGraphStorage.createComponent(component, parent);
      const parent = this.selectedEditor.getGraph().getDefaultParent();
      this.selectedEditor.createComponent(component,parent);

    } else {
      const parent = this.selectedGraphStorage.getGraph().getDefaultParent();
      this.selectedGraphStorage.createComponent(component, parent, x, y);
    }
  }

  applyLayout(layout: String) {
    this.selectedGraphStorage.applyLayout(layout);
  }


  getGraphStorage() {
    return this.selectedGraphStorage;
  }

  syncStorage() {
    this.selectedGraphStorage.syncStyle(this.styleEditorService);
    this.selectedGraphStorage.syncStorage();
  }

  syncMxCells() {
    this.selectedGraphStorage.syncMxCells();
  }

  addArrow() {

  }

  zoomTo(zoomFactor: any) {
    this.selectedGraphStorage.zoomTo(zoomFactor);
  }

  getMaxVertexID() {
    return this.getGraphStorage().getMaxID();
  }
}
