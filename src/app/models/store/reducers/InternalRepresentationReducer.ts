import { Action, createReducer } from "typed-reducer";
import { PageUICDL } from "../../internalRepresentation/pageUICDL.model";
import { UIComponent } from "../../internalRepresentation/UIComponent.model";
import { IRClearPageUICDLAction, IRDeletePageUICDLAction, IRInsertPageUICDLAction, IRInsertUIComponentAction, IRRenamePageAction, IRSetLayoutAction, IRSetProjectNameAction, IRSyncWithERAction } from "../actions/internalRepresentation.action";
import { InternalRepresentation } from "../app.state";

class InternalRepresentationReducer {
    @Action
    public insertPageUICDL(store: InternalRepresentation, action: IRInsertPageUICDLAction): InternalRepresentation {
        store = { ...store };
        // action.pageUICDL['imsMain'] = action.imsMain;
        store.pageUICDLs = { ...store.pageUICDLs, [action.pageUICDL.id]: action.pageUICDL };
        store.pageUICDLs[action.pageUICDL.id] = {...store.pageUICDLs[action.pageUICDL.id]};
        store.pageUICDLs[action.pageUICDL.id].imsMain = action.imsMain;
        return store;
    }

    @Action
    public setLayout(store: InternalRepresentation, action: IRSetLayoutAction) {
        if(action.id == undefined)
            return;
        store = {...store};
        store.pageUICDLs = {...store.pageUICDLs};
        store.pageUICDLs[action.id] = {...store.pageUICDLs[action.id]};
        store.pageUICDLs[action.id].layout = action.layout;
        return store;
    }
    
    @Action
    public setProjectName(store: InternalRepresentation, action: IRSetProjectNameAction): InternalRepresentation {
        store = {...store};
        store.projectName = action.projectName;
        return store;
    }

    @Action
    public syncWithER(store: InternalRepresentation, action: IRSyncWithERAction): InternalRepresentation {
        if (action.id == undefined)
            return store;
        if (store.pageUICDLs[action.id] == undefined)
            return store;
        store = { ...store };
        let graphModel = action.graphModel;
        // console.log(graphModel);
        store.pageUICDLs = { ...store.pageUICDLs };
        store.pageUICDLs[action.id] = { ...store.pageUICDLs[action.id] };
        store.pageUICDLs[action.id].body = { ...store.pageUICDLs[action.id].body };
        // console.log(store.pageUICDLs[action.id].body.componentList)
        if(store.pageUICDLs[action.id].body.componentList == undefined)
            return store;
        store.pageUICDLs[action.id].body.componentList = [...store.pageUICDLs[action.id].body.componentList];
        let componentLength = store.pageUICDLs[action.id].body.componentList.length;

        // console.log("cell size: " + graphModel.length);
        for (let j = 0; j < graphModel.length; j++) {
            let flag = true;
            let cell = graphModel[j];
            if(cell["isPrimary"] == undefined || cell["componentID"] == undefined) {
                continue;
            }
            for (let index = 0; index < componentLength; index++) {
                let componentID = store.pageUICDLs[action.id].body.componentList[index].id

                // for subComponent
                if (store.pageUICDLs[action.id].body.componentList[index].componentList != undefined) {
                    let subComponentLength = store.pageUICDLs[action.id].body.componentList[index].componentList.length;
                    for (let k = 0; k < subComponentLength; k++) {
                        let subComponentID = store.pageUICDLs[action.id].body.componentList[index].componentList[k].id;
                        // console.log(`hello componentID = ${componentID}\nsubComponentID = ${subComponentID}`);
                        if (cell["componentID"] == subComponentID && cell["isPrimary"] == true) {
                            // console.log("hello subComponent Here");
                            // console.log(store.pageUICDLs[action.id].body.componentList[index].componentList[k])
                            store.pageUICDLs[action.id].body.componentList[index] = (store.pageUICDLs[action.id].body.componentList[index] as UIComponent);
                            store.pageUICDLs[action.id].body.componentList[index].componentList = [ ...store.pageUICDLs[action.id].body.componentList[index].componentList ];
                            store.pageUICDLs[action.id].body.componentList[index].componentList[k] = {...store.pageUICDLs[action.id].body.componentList[index].componentList[k] as UIComponent, style:cell['style'], geometry: cell['geometry']};
                            // store.pageUICDLs[action.id].body.componentList[index].componentList[k].geometry = { ...store.pageUICDLs[action.id].body.componentList[index].componentList[k].geometry};
                            // store.pageUICDLs[action.id].body.componentList[index].componentList[k].geometry = cell['geometry'];
                            // store.pageUICDLs[action.id].body.componentList[index].componentList[k].style = { ...store.pageUICDLs[action.id].body.componentList[index].componentList[k].style};
                            // store.pageUICDLs[action.id].body.componentList[index].componentList[k].style = cell['style'] ;
                            // console.log("update");
                            // console.log(cell["geometry"])
                            // console.log(cell["style"]);
                            // console.log(store.pageUICDLs[action.id].body.componentList[index].componentList[k]);
                            // console.log(store.pageUICDLs[action.id].body.componentList)

                            flag = false;
                        }
                        if(!flag)
                            break;
                    }
                }

                if (cell["componentID"] == componentID && cell["isPrimary"] == true) {
                    // store.pageUICDLs[action.id].body.componentList[index] = (store.pageUICDLs[action.id].body.componentList[index] as UIComponent);
                    store.pageUICDLs[action.id].body.componentList[index] = {...store.pageUICDLs[action.id].body.componentList[index] as UIComponent, geometry: cell['geometry'], style: cell['style']};
                    // store.pageUICDLs[action.id].body.componentList[index].geometry = { ...store.pageUICDLs[action.id].body.componentList[index].geometry};
                    // store.pageUICDLs[action.id].body.componentList[index].geometry = cell["geometry"];
                    // store.pageUICDLs[action.id].body.componentList[index].style = { ...store.pageUICDLs[action.id].body.componentList[index].style};
                    // store.pageUICDLs[action.id].body.componentList[index].style = cell["style"];
                    flag = false;
                }

                if (!flag)
                    break;
            }
        }

        // console.log(store.pageUICDLs[action.id].body.componentList)
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
        store = { ...store };
        store.pageUICDLs = { ...store.pageUICDLs };
        store.pageUICDLs[action.id] = { ...store.pageUICDLs[action.id] };
        store.pageUICDLs[action.id].name = action.pageName;
        if(action.pageName == 'imsMain') {
            store.pageUICDLs[action.id].imsMain = true;
        }
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