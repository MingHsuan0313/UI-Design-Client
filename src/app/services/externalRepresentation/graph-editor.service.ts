import { Injectable } from "@angular/core";
import { GraphStorage } from "../../models/graph-dependency";
import StyleEditorService from "./style-editor.service";
import { StyleConverter } from "../../shared/styleTable";
import { AppState } from "src/app/models/store/app.state";
import { Action, Store } from "@ngrx/store";
import { SelabEditor } from "src/app/models/externalRepresentation/selab-editor.model";
import { UIComponent } from "src/app/models/ui-component-dependency";
import { IRSyncWithERAction } from "src/app/models/store/actions/internalRepresentation.action";

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
  
  isModified(graphID:string) {
    if(this.editors == undefined)
      return false;
    if(this.editors.get(graphID) != undefined)
      return this.editors.get(graphID).getEditor().modified.valueOf();
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

  setGraphModel(graphModel: mxGraphModel){
    this.selectedEditor.setGraphModel(graphModel);
    this.selectedEditor.editor.graph.refresh();
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

  bindComponent(component, geometry?) {
    const parent = this.selectedEditor.getGraph().getDefaultParent();
    if (geometry == undefined) {
      // const parent = this.selectedGraphStorage.getGraph().getDefaultParent();
      // this.selectedGraphStorage.createComponent(component, parent);
        this.selectedEditor.createComponent(component,parent);
    }else{
        this.selectedEditor.createComponent(component, parent, geometry, true);
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
    // for(let editor in this.editors)
    this.editors.forEach((selabEditor, key) => {
      let model = selabEditor.getGraphModel().cells;
      let cells = this.generateGraphModel(model);
      this.store.dispatch(new IRSyncWithERAction(key,cells as any))
      selabEditor.editor.modified = false;
    })
    // this.selectedGraphStorage.syncStyle(this.styleEditorService);
    // this.selectedGraphStorage.syncStorage();
  }
  
  generateGraphModel(model) {
    let cells = [];
    console.log("start generating");
    console.log(model)
    for(let key in model) {
      let cell = {
        geometry: {},
        style: model[key].style,
        value: model[key].value,
        componentID: model[key].componentID,
        isPrimary: model[key].isPrimary,
      }
      if (model[key].geometry != undefined) {
        cell["geometry"]["x"] = model[key].geometry.x;
        cell["geometry"]["y"] = model[key].geometry.y;
        cell["geometry"]["width"] = model[key].geometry.width;
        cell["geometry"]["height"] = model[key].geometry.height;
        let styleObj = this.styleEditorService.convertStyleDescriptionToJsobObject(model[key].style);
        let styleConverter = new StyleConverter();
        styleObj = styleConverter.convertObject(styleObj);
        cell["style"] = styleObj;

      }
      cells.push(cell);
    }
    return cells;
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
