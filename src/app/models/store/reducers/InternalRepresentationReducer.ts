import { Action, createReducer } from "typed-reducer";
import { PageUICDL } from "../../internalRepresentation/pageUICDL.model";
import { IRInitializePageUICDLAction, IRInsertUIComponentAction } from "../actions/internalRepresentation.action";
import { InternalRepresentation } from "../app.state";

class InternalRepresentationReducer {
    @Action
    public initializePageUICDL(store: InternalRepresentation,action :IRInitializePageUICDLAction): InternalRepresentation {
        store = {...store};
        store.pageUICDLs = [...store.pageUICDLs,action.pageUICDL];
        return store;
    }

    @Action
    public insertUIComponent(store: InternalRepresentation,action :IRInsertUIComponentAction): InternalRepresentation {
        store = {...store};
        store.pageUICDLs = [...store.pageUICDLs]
        store.pageUICDLs[0] = ({...store.pageUICDLs[0]} as any)
        store.pageUICDLs[0].body = ({...store.pageUICDLs[0].body} as any)
        store.pageUICDLs[0].body.componentList = ([...store.pageUICDLs[0].body.componentList,action.uiComponent] as any)
        return store; 
    }
}

export const internalRepresentationReducer = createReducer(InternalRepresentationReducer)