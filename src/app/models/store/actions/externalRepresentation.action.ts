import { Action } from "@ngrx/store";
import { GraphStorage } from "src/app/models/externalRepresentation/graph-storage.model";
import { UIComponent } from "src/app/models/ui-component-dependency";
import { SelabGraph } from "../selabGraph.model";
import { SelabVertex } from "../selabVertex.model";

export enum ERActionTypes {
    INITIALIZATION = "[ExternalRepresentation] Initialize GraphStorage",
    INSERT_VERTEX = "[ExternalRepresentation] Insert Vertex",
    TEST = "[ExternalRepresentation] Test"
}

export class ERTestAction implements Action {
   public type = ERActionTypes["TEST"];
   constructor() {}
}

export class ERInitializationAction implements Action {
    public type = ERActionTypes["INITIALIZATION"];
    constructor(public graphStorage: SelabGraph) {

    }
}

export class ERInsertVertexAction implements Action {
    public type = ERActionTypes["INSERT_VERTEX"];
    constructor(public vertex: SelabVertex){}
}