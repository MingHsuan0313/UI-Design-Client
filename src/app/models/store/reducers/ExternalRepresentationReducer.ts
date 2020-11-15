import { createReducer,Action } from "typed-reducer";
import { ERInitializationAction } from "../actions/externalRepresentation.action";
import { ExternalRepresentation } from "../app.state";

class ExternalRepresentationReducer {
    @Action
    public initialization(store: ExternalRepresentation,action: ERInitializationAction): ExternalRepresentation {
        console.log("Initialize...")

        return store; 
    }
}

export const externalRepresentationReducer = createReducer(ExternalRepresentationReducer);