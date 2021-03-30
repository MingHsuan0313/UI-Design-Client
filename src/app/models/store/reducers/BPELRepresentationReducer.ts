import { Action, createReducer } from "typed-reducer";
import { BPELRepresentationDeleteBpelComponentAction, BPELRepresentationInitFilenameAction, BPELRepresentationInsertBpelComponentAction, BPELRepresentationUpdateFilenameAction, BPELRepresentationUpdateProcessAction } from "../actions/bpelProcessRepresentation.action";
import { BPELRepresentation } from "../app.state";

class BPELRepresentationReducer {
    @Action
    public insertBpelComponent(store: BPELRepresentation, action: BPELRepresentationInsertBpelComponentAction): BPELRepresentation {
        store = {
            ...store,
            vertexStorageList: action.vertexStorageList,
            edgeStorageList: action.edgeStorageList
        };

        return store;
    }

    @Action
    public initFilename(store: BPELRepresentation, action: BPELRepresentationInitFilenameAction): BPELRepresentation {
        store = {
            ...store,
            filename: action.filename
        };

        return store;
    }

    @Action
    public updateProcess(store: BPELRepresentation, action: BPELRepresentationUpdateProcessAction): BPELRepresentation {
        // console.log(`id = ${action.id}, key = ${action.key}, value = ${action.value}`);

        // store = {
        //     ...store,
        //     vertexStorageList: {
        //         ...store.vertexStorageList,
        //         [action.id]: {
        //             ...store.vertexStorageList[action.id],
        //             // component: {
        //             //     ...store.vertexStorageList[action.id].component,
        //             // }
        //         }
        //     }
        // };
        // store.vertexStorageList[id].component.attribute = {
        //     ...store.vertexStorageList[id].component.attribute,
        //     [action.key]: action.value
        // }

        return store;
    }

    @Action
    public updateFilename(store: BPELRepresentation, action: BPELRepresentationUpdateFilenameAction): BPELRepresentation {
        store = {
            ...store,
            filename: action.filename
        };

        return store;
    }

    @Action
    public deleteBpelComponent(store: BPELRepresentation, action: BPELRepresentationDeleteBpelComponentAction): BPELRepresentation {
        store = {
            ...store,
            process: action.process
        };

        return store;
    }
}

export const bpelRepresentationReducer = createReducer(BPELRepresentationReducer)
