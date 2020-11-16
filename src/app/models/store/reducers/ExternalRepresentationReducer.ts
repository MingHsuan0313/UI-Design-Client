import { st } from "@angular/core/src/render3";
import { createReducer, Action } from "typed-reducer";
import { ERInitializationAction, ERInsertVertexAction } from "../actions/externalRepresentation.action";
import { ExternalRepresentation } from "../app.state";

class ExternalRepresentationReducer {
    @Action
    public initialization(store: ExternalRepresentation, action: ERInitializationAction): ExternalRepresentation {
        console.log("Initialize...")
        store = { ...store };
        store.graphStorages = [...store.graphStorages, action.graphStorage];
        return store;
    }

    @Action
    public insertVertex(store: ExternalRepresentation, action: ERInsertVertexAction) {
        console.log("insert vertex");
        store = { ...store };
        store.graphStorages = [...store.graphStorages];
        store.graphStorages[0] = ({...store.graphStorages[0]});
        let vertexCount = Object.keys(store.graphStorages[0].vertexStorages).length;
        store.graphStorages[0].vertexStorages = {...store.graphStorages[0].vertexStorages};
        // store.graphStorages[0].vertexStorages.set(vertexCount,action.vertex);
        (store.graphStorages[0].vertexStorages as any) = {...store.graphStorages[0].vertexStorages,
            [vertexCount]: action.vertex};
            
        return store;
    }
}

export const externalRepresentationReducer = createReducer(ExternalRepresentationReducer);