import { createReducer, Action } from "typed-reducer";
import { ERClearGraphStorageActition, ERDeleteGraphStorageAction, ERInsertGraphStorageAction, ERInsertVertexAction } from "../actions/externalRepresentation.action";
import { ExternalRepresentation } from "../app.state";

class ExternalRepresentationReducer {
    @Action
    public insertGraphStorage(store: ExternalRepresentation, action: ERInsertGraphStorageAction): ExternalRepresentation {
        store = { ...store };
        store.graphStorages = {...store.graphStorages, [action.graphStorage.id]:action.graphStorage};
        return store;
    }
    
    @Action
    public deleteGraphStorage(store: ExternalRepresentation, action: ERDeleteGraphStorageAction): ExternalRepresentation {
        store = {...store};
        store.graphStorages = {...store.graphStorages};
        delete store.graphStorages[action.id];
        return store;
    }
    
    @Action 
    public clearGraphStorage(store: ExternalRepresentation, action: ERClearGraphStorageActition): ExternalRepresentation {
        store = {...store};
        store.graphStorages = {...store.graphStorages};
        store.graphStorages[action.id] = {...store.graphStorages[action.id]} 
        store.graphStorages[action.id].vertexStorages = new Map();
        store.graphStorages[action.id].edgeStorages = new Map();
        return store;
    }

    @Action
    public insertVertex(store: ExternalRepresentation, action: ERInsertVertexAction) {
        if(action.id == "navigation")
            return store;
        // console.log(action);
        store = { ...store };
        store.graphStorages = {...store.graphStorages};
        let id = action.id;
        store.graphStorages[id] = ({...store.graphStorages[id]});
        let vertexCount = Object.keys(store.graphStorages[id].vertexStorages).length;
        store.graphStorages[id].vertexStorages = {...store.graphStorages[id].vertexStorages};
        // store.graphStorages[0].vertexStorages.set(vertexCount,action.vertex);
        (store.graphStorages[id].vertexStorages as any) = {...store.graphStorages[id].vertexStorages,
            [vertexCount]: action.vertex};
            
        return store;
    }
}

export const externalRepresentationReducer = createReducer(ExternalRepresentationReducer);