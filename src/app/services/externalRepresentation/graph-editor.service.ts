import { Injectable, ElementRef } from "@angular/core";
import { Storage } from "../../shared/storage"
import { GraphStorage } from "../../models/graph-dependency";
import { PageUICDL } from "src/app/models/internalRepresentation/pageUICDL.model";
import StyleEditorService from "./style-editor.service";
import { StyleConverter } from "../../shared/styleTable";
import { AppState } from "src/app/models/store/app.state";
import { Action, Store } from "@ngrx/store";
import { IRInitializePageUICDLAction } from "src/app/models/store/actions/internalRepresentation.action";
import { irComponentListReducer } from "src/app/models/store/reducers/IRComponentListReducer";
import { ERInitializationAction, ERTestAction } from "src/app/models/store/actions/externalRepresentation.action";

@Injectable({
  providedIn: "root"
})
export default class GraphEditorService {
  graphStorages: GraphStorage[];
  selectedGraphID: string;
  selectedGraphStorage: GraphStorage;

  constructor(private styleEditorService: StyleEditorService,
    private store: Store<AppState> 
    ) {
    this.graphStorages = [];
  }

  // argument : native html element reference (container)
  // return : void
  // function : create graph
  createGraph(element: HTMLElement) {
    this.selectedGraphStorage = new GraphStorage(element, "graphContainer" + this.graphStorages.length.toString());
    this.graphStorages.push(this.selectedGraphStorage);
    this.selectedGraphID = this.selectedGraphStorage.getID();
    // Storage.createPageUICDL();

    let pageID = "page" + this.selectedGraphID;
    let newPageUICDL = new PageUICDL(2);
    Storage.setPageUICDL(newPageUICDL);
    this.store.dispatch(new IRInitializePageUICDLAction(newPageUICDL));
    this.store.dispatch(new ERInitializationAction());
    this.store.dispatch(new ERTestAction());
    // this.store.addReducer("12222",(state = newPageUICDL.body.componentList,action:Action) => irComponentListReducer(state,action))
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

  applyLayout(layout: String) {
    this.selectedGraphStorage.applyLayout(layout);
  }


  getGraphStorage() {
    return this.selectedGraphStorage;
  }

  syncStorage() {
    // let styleConverter = new StyleConverter();
    // let fakeStyleObject = {
    //   strokeColor: "#c8ced3",
    //   fillColor: "#ffffff",
    //   rounded: "1",
    //   shadow: "1",
    //   opacity: "0",
    //   fontSize: "23"
    // }
    // console.log("start converting")
    // console.log(styleConverter.converObject(fakeStyleObject));
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
