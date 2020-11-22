import { Action, createReducer } from "typed-reducer";
import { PageUICDL } from "../../internalRepresentation/pageUICDL.model";
import { IRClearPageUICDLAction, IRDeletePageUICDLAction, IRInsertPageUICDLAction, IRInsertUIComponentAction, IRRenamePageAction } from "../actions/internalRepresentation.action";
import { InternalRepresentation } from "../app.state";

class InternalRepresentationReducer {
    @Action
    public insertPageUICDL(store: InternalRepresentation,action : IRInsertPageUICDLAction): InternalRepresentation {
        store = {...store};
        store.pageUICDLs = {...store.pageUICDLs,[action.pageUICDL.id]:action.pageUICDL};
        return store;
    }
    
    @Action
    public deletePageUICDL(store: InternalRepresentation, action: IRDeletePageUICDLAction): InternalRepresentation {
        store = {...store};     
        store.pageUICDLs = {...store.pageUICDLs};
        delete store.pageUICDLs[action.id];
        return store;
    }
    
    @Action
    public renamePage(store: InternalRepresentation, action: IRRenamePageAction): InternalRepresentation {
        console.log("rename");
       store = {...store};
       store.pageUICDLs = {...store.pageUICDLs};
       store.pageUICDLs[action.id] = {...store.pageUICDLs[action.id]};
       store.pageUICDLs[action.id].name = action.pageName;
       return store;
    }

    
    @Action
    public clearPageUICDL(store: InternalRepresentation, action: IRClearPageUICDLAction): InternalRepresentation {
        store = {...store};
        store.pageUICDLs = {...store.pageUICDLs};
        store.pageUICDLs[action.id] = {...store.pageUICDLs[action.id]};
        store.pageUICDLs[action.id].body = {...store.pageUICDLs[action.id].body};
        store.pageUICDLs[action.id].body.componentList = [];
        return store;
    }

    @Action
    public insertUIComponent(store: InternalRepresentation,action :IRInsertUIComponentAction): InternalRepresentation {
        store = {...store};
        store.pageUICDLs = {...store.pageUICDLs};
        let id = action.id;
        store.pageUICDLs[id] = ({...store.pageUICDLs[id]} as any)
        store.pageUICDLs[id].body = ({...store.pageUICDLs[id].body} as any)
        store.pageUICDLs[id].body.componentList = ([...store.pageUICDLs[id].body.componentList,action.uiComponent] as any)
        return store; 
    }
}

export const internalRepresentationReducer = createReducer(InternalRepresentationReducer)