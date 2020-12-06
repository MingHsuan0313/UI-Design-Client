import { Action, createReducer } from "typed-reducer";
import { PageUICDL } from "../../internalRepresentation/pageUICDL.model";
import { IRClearPageUICDLAction, IRDeletePageUICDLAction, IRInsertPageUICDLAction, IRInsertUIComponentAction, IRRenamePageAction, IRSyncWithERAction } from "../actions/internalRepresentation.action";
import { InternalRepresentation } from "../app.state";

class InternalRepresentationReducer {
    @Action
    public insertPageUICDL(store: InternalRepresentation, action: IRInsertPageUICDLAction): InternalRepresentation {
        store = { ...store };
        store.pageUICDLs = { ...store.pageUICDLs, [action.pageUICDL.id]: action.pageUICDL };
        return store;
    }

    @Action
    public syncWithER(store: InternalRepresentation, action: IRSyncWithERAction): InternalRepresentation {
        store = { ...store };
        let graphModel = action.graphModel;
        store = { ...store };
        store.pageUICDLs = { ...store.pageUICDLs };
        store.pageUICDLs[action.id] = { ...store.pageUICDLs[action.id] };
        store.pageUICDLs[action.id].body = { ...store.pageUICDLs[action.id].body };
        store.pageUICDLs[action.id].body.componentList = [ ...store.pageUICDLs[action.id].body.componentList];
        let componentLength = store.pageUICDLs[action.id].body.componentList.length;
        for (let j = 0;j < graphModel.length;j++) {
            let cell = graphModel[j];
            for (let index = 0; index < componentLength; index++) {
                let componentID = store.pageUICDLs[action.id].body.componentList[index].id
                // console.log(`component id: ${componentID}`);
                // console.log(store.pageUICDLs[action.id].body.componentList[index].getName());
                if (cell["componentID"] == componentID && cell["isPrimary"] == true) {
                    store.pageUICDLs[action.id].body.componentList[index] = {...store.pageUICDLs[action.id].body.componentList[index]};
                    store.pageUICDLs[action.id].body.componentList[index] = {...store.pageUICDLs[action.id].body.componentList[index],"geometry":cell["geometry"]};
                    store.pageUICDLs[action.id].body.componentList[index] = {...store.pageUICDLs[action.id].body.componentList[index],"style":cell["style"]};
                }
            }
        }


        return store;
    }

    @Action
    public deletePageUICDL(store: InternalRepresentation, action: IRDeletePageUICDLAction): InternalRepresentation {
        store = { ...store };
        store.pageUICDLs = { ...store.pageUICDLs };
        delete store.pageUICDLs[action.id];
        return store;
    }

    @Action
    public renamePage(store: InternalRepresentation, action: IRRenamePageAction): InternalRepresentation {
        console.log("rename");

        store = { ...store };
        store.pageUICDLs = { ...store.pageUICDLs };
        store.pageUICDLs[action.id] = { ...store.pageUICDLs[action.id] };
        store.pageUICDLs[action.id].name = action.pageName;
        return store;
    }


    @Action
    public clearPageUICDL(store: InternalRepresentation, action: IRClearPageUICDLAction): InternalRepresentation {
        store = { ...store };
        store.pageUICDLs = { ...store.pageUICDLs };
        store.pageUICDLs[action.id] = { ...store.pageUICDLs[action.id] };
        store.pageUICDLs[action.id].body = { ...store.pageUICDLs[action.id].body };
        store.pageUICDLs[action.id].body.componentList = [];
        return store;
    }

    @Action
    public insertUIComponent(store: InternalRepresentation, action: IRInsertUIComponentAction): InternalRepresentation {
        store = { ...store };
        store.pageUICDLs = { ...store.pageUICDLs };
        let id = action.id;
        store.pageUICDLs[id] = ({ ...store.pageUICDLs[id] } as any)
        store.pageUICDLs[id].body = ({ ...store.pageUICDLs[id].body } as any)
        store.pageUICDLs[id].body.componentList = ([...store.pageUICDLs[id].body.componentList, action.uiComponent] as any)
        return store;
    }
}

export const internalRepresentationReducer = createReducer(InternalRepresentationReducer)