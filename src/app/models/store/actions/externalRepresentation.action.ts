import { Action } from "@ngrx/store";
import { GraphStorage } from "src/app/models/externalRepresentation/graph-storage.model";
import { UIComponent } from "src/app/models/ui-component-dependency";

export enum ERActionTypes {
    INITIALIZATION = "[ExternalRepresentation] Initialize GraphStorage",
    TEST = "[ExternalRepresentation] Test"
}

export class ERTestAction implements Action {
   public type = ERActionTypes["TEST"];
   constructor() {}
}

export class ERInitializationAction implements Action {
    public type = ERActionTypes["INITIALIZATION"];
    constructor() {

    }
}