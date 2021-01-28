import { Injectable } from "@angular/core";
import StyleEditorService from "./style-editor.service";
import { StyleConverter } from "../../shared/styleTable";
import { AppState } from "src/app/models/store/app.state";
import { Action, Store } from "@ngrx/store";
import { SelabEditor } from "src/app/models/externalRepresentation/selab-editor.model";
import { UIComponent } from "src/app/models/ui-component-dependency";
import { IRInsertPageUICDLAction, IRRenamePageAction, IRSyncWithERAction } from "src/app/models/store/actions/internalRepresentation.action";
import { element } from "@angular/core/src/render3/instructions";
import { PageUICDL } from "src/app/models/internalRepresentation/pageUICDL.model";
import { SelabPageModel } from "./selab-page.model";
import { ERInsertGraphStorageAction } from "src/app/models/store/actions/externalRepresentation.action";
import { SelabGraph } from "src/app/models/externalRepresentation/selabGraph.model";

@Injectable({
  providedIn: "root"
})
export default class GraphEditorService {
  editors: Map<string, SelabEditor>;
  // selectedEditor: SelabEditor;
  selectedUIComponent: UIComponent;
  editor: SelabEditor;
  pageStorage: SelabPageModel[];
  selectedPageId: string;

  constructor(private styleEditorService: StyleEditorService,
    private store: Store<AppState>
  ) {
    setTimeout(() => {
      this.selectedUIComponent = undefined;
      // this.editors = new Map();
      let element = document.getElementById('graph-container');
      this.editor = new SelabEditor(element, this.store, this);
      this.pageStorage = []
      this.createPage();
    }, 500)
  }


  isModified(graphID: string) {
    // if (this.editors == undefined)
    //   return false;
    // if (this.editors.get(graphID) != undefined)
    //   return this.editors.get(graphID).getEditor().modified.valueOf();
  }

  createEditor(element: HTMLElement) {
    // let editor = new SelabEditor(element,this.store,this);
    // this.editors.set(element.id,editor);
    // this.selectedEditor = editor;
  }

  getSelectedGraphID(): string {
    return this.selectedPageId;
  }

  createPage() {
    console.log('create page')
    let uuid = require('uuid');
    let pageId = `${this.editor.id}-${uuid.v1()}`;
    let newPage = new PageUICDL(pageId);
    if(this.pageStorage.length == 0)
      newPage.isMain = true
    else
      newPage.isMain = false
    this.store.dispatch(new IRInsertPageUICDLAction(newPage));
    this.store.dispatch(new IRRenamePageAction(pageId, 'newpage'));
    this.store.dispatch(new ERInsertGraphStorageAction(new SelabGraph(pageId)))
    this.setSelectedPage(pageId);
  }

  deletePage(pageId: string) {

  }

  setSelectedPage(pageId: string) {
    this.selectedPageId = pageId;
  }

  // setSelectedEditor(editorID: string) {
  //   this.selectedEditor = this.editors.get(editorID);
  // }

  getGraph(): mxGraph {
    return this.editor.getGraph();
  }

  getGraphModel(): mxGraphModel {
    return this.editor.getGraphModel();
  }

  getGraphView(): mxGraphView {
    return this.editor.getGraphView();
  }

  setGraphModel(graphModel: mxGraphModel) {
    this.editor.setGraphModel(graphModel);
    this.editor.editor.graph.refresh();
  }

  zoomTo(zoomFactor: any) {
    let graph = this.getGraph();
    graph.zoomTo(zoomFactor, graph.centerZoom);
  }

  createGraph(element: HTMLElement) {
    // this.selectedGraphStorage = new GraphStorage(element, "graphContainer" + this.graphStorages.length.toString(),this.store);
    // this.graphStorages.push(this.selectedGraphStorage);
    // this.selectedGraphID = this.selectedGraphStorage.getID();
    // let pageID = "page" + this.selectedGraphID;
  }

  bindComponent(component, geometry?) {
    const parent = this.editor.getGraph().getDefaultParent();
    if (geometry == undefined) {
      // const parent = this.selectedGraphStorage.getGraph().getDefaultParent();
      // this.selectedGraphStorage.createComponent(component, parent);
      this.editor.createComponent(component, parent);
    } else {
      this.editor.createComponent(component, parent, geometry, true);
    }


  }

  applyLayout(layout: string) {
    this.editor.applyLayout(layout);
    // this.selectedGraphStorage.applyLayout(layout);
  }

  syncStorage() {
    // for(let editor in this.editors)
    // this.editors.forEach((selabEditor, key) => {
    //   let model = selabEditor.getGraphModel().cells;
    //   let cells = this.generateGraphModel(model);
    //   this.store.dispatch(new IRSyncWithERAction(key, cells as any))
    //   selabEditor.editor.modified = false;
    // })
    // this.selectedGraphStorage.syncStyle(this.styleEditorService);
    // this.selectedGraphStorage.syncStorage();
  }

  generateGraphModel(model) {
    let cells = [];
    console.log("start generating");
    console.log(model)
    for (let key in model) {
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
    // this.selectedGraphStorage.syncMxCells();
  }

  addArrow() {

  }

  getMaxVertexID() {
    // return this.getGraphStorage().getMaxID();
  }
}
