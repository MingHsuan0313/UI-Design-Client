import { Injectable, ElementRef } from "@angular/core";
import { Storage } from "../../shared/storage"
import { GraphStorage } from "../../models/graph-dependency";
import { PageUICDL } from "src/app/models/internalRepresentation/pageUICDL.model";
import StyleEditorService from "./style-editor.service";
import { StyleConverter } from "../../shared/styleTable";
import { AppState } from "src/app/models/store/app.state";
import { Action, Store } from "@ngrx/store";
import { Configuration } from "./util/configuration";
import { SelabEditor } from "src/app/models/externalRepresentation/selab-editor.model";
import { UIComponent } from "src/app/models/ui-component-dependency";

@Injectable({
  providedIn: "root"
})
export default class GraphEditorService {
  graphStorages: GraphStorage[];
  selectedGraphID: string;
  selectedGraphStorage: GraphStorage;


  editors: Map<string,SelabEditor>;
  selectedEditor: SelabEditor;
  selectedUIComponent: UIComponent;

  constructor(private styleEditorService: StyleEditorService,
    private store: Store<AppState> 
    ) {
    this.graphStorages = [];
    this.selectedUIComponent = undefined;
    this.editors = new Map();
  }
  
  createEditor(element: HTMLElement) {
    let editor = new SelabEditor(element,this.store,this);
    this.editors.set(element.id,editor);
    this.selectedGraphID = element.id;
    this.selectedEditor = editor;
  }
  
  getSelectedGraphID(): string {
    return this.selectedEditor.id;
  }
  
  setSelectedEditor(editorID: string) {
    this.selectedEditor = this.editors.get(editorID);
    this.selectedGraphID = this.selectedEditor.id;
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

  zoomTo(zoomFactor: any) {
    let graph = this.getGraph();
    graph.zoomTo(zoomFactor,graph.centerZoom);
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

  applyLayout(layout: string) {
    this.selectedEditor.applyLayout(layout);
    // this.selectedGraphStorage.applyLayout(layout);
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


  getMaxVertexID() {
    return this.getGraphStorage().getMaxID();
  }
}
