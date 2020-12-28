import { Action } from "@ngrx/store";
import { GraphStorage } from "src/app/models/externalRepresentation/graph-storage.model";
import { UIComponent } from "src/app/models/ui-component-dependency";
import { SelabGraph } from "../../externalRepresentation/selabGraph.model";
import { SelabVertex } from "../../externalRepresentation/selabVertex.model";

export enum ERActionTypes {
    INSERT_GRAPHSTORAGE = "[ExternalRepresentation] Insert GraphStorage",
    DELETE_GRAPHSTORAGE ="[ExternalReprsentation] Delete GraphStorage",
    INSERT_VERTEX = "[ExternalRepresentation] Insert Vertex",
    CLEAR_GRAPHSTORAGE = "[ExternalRepresentation] Clear GraphStorage",
    TEST = "[ExternalRepresentation] Test"
}

export class ERTestAction implements Action {
   public type = ERActionTypes["TEST"];
   constructor() {}
}

export class ERInsertGraphStorageAction implements Action {
    public type = ERActionTypes["INSERT_GRAPHSTORAGE"];
    constructor(public graphStorage: SelabGraph) {}
}

export class ERClearGraphStorageActition implements Action {
    public type = ERActionTypes["CLEAR_GRAPHSTORAGE"];
    constructor(public id: string){}
}

export class ERInsertVertexAction implements Action {
    public type = ERActionTypes["INSERT_VERTEX"];
    constructor(public id: string,public vertex: SelabVertex){}
}

export class ERDeleteGraphStorageAction implements Action {
    public type = ERActionTypes["DELETE_GRAPHSTORAGE"];
    constructor(public id: string) {}
}