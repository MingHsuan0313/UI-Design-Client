import { Action, createReducer } from "typed-reducer";
import { PageUICDL } from "../../internalRepresentation/pageUICDL.model";
import { UIComponent } from "../../internalRepresentation/UIComponent.model";
import { IRClearPageUICDLAction, IRDeletePageUICDLAction, IRDeleteThemeAction, IRInsertPageImageAction, IRInsertPageUICDLAction, IRInsertThemeAction, IRInsertUIComponentAction, IRRenamePageAction, IRRenameThemeAction, IRSetLayoutAction, IRSetProjectNameAction, IRSyncWithERAction, IRAddNDLEdgeAction, IRDeleteNDLPageAction, IRInitialNDLAction, IRInsertNDLPageAction, IRClearNDLThemeEdgeAction } from "../actions/internalRepresentation.action";
import { InternalRepresentation } from "../app.state";
import produce from 'immer';
// import { enableMapSet } from 'immer';

// enableMapSet()

class InternalRepresentationReducer {
    @Action
    public insertTheme(store: InternalRepresentation, action: IRInsertThemeAction): InternalRepresentation {
        return produce(store, draft => {
            draft.themes.push({
                name: action.name,
                id: action.id,
                pages: []
            })
        })
    }

    @Action
    public insertPageImage(store: InternalRepresentation, action: IRInsertPageImageAction): InternalRepresentation {
        store = { ...store };
        store.pageImages = { ...store.pageImages, [action.id]: action.pageImage };
        return store;
    }

    @Action
    public deleteTheme(store: InternalRepresentation, action: IRDeleteThemeAction): InternalRepresentation {
        store = { ...store };
        store.themes = [...store.themes];
        if (action.index > -1)
            store.themes.splice(action.index, 1);
        return store;
    }

    @Action
    public renameTheme(store: InternalRepresentation, action: IRRenameThemeAction): InternalRepresentation {
        return produce(store, draft => {
            draft.themes[action.index].name = action.newName;
        })
    }

    @Action
    public insertPageUICDL(store: InternalRepresentation, action: IRInsertPageUICDLAction): InternalRepresentation {
        store = {
            ...store,
            pageUICDLs: {
                ...store.pageUICDLs,
                [action.pageUICDL.id]: {
                    ...action.pageUICDL,
                    isMain: action.isMain
                }
            },
        }
        return produce(store, draft => {
            draft.themes[action.selectedThemeIndex].pages.push({ name: action.pageUICDL.name, id: action.pageUICDL.id });
        })
    }

    @Action
    public setLayout(store: InternalRepresentation, action: IRSetLayoutAction): InternalRepresentation {
        if (action.id == undefined)
            return store;
        else {
            store = {
                ...store,
                pageUICDLs: {
                    ...store.pageUICDLs,
                    [action.id]: {
                        ...store.pageUICDLs[action.id],
                        layout: action.layout
                    }
                }
            }
            return store;
        }
    }

    @Action
    public setProjectName(store: InternalRepresentation, action: IRSetProjectNameAction): InternalRepresentation {
        return produce(store, draft => {
            draft.projectName = action.projectName;
        })
    }

    findCell(graphModel: any[], componentId: string) {
        console.log('find cell');
        console.log(graphModel)
        console.log(componentId)
        let cells = []
        for (let index = 0; index < graphModel.length; index++) {
            if (graphModel[index].componentID == componentId) {
                cells.push(graphModel[index]);
            }
        }
        return cells;
    }

    // binding style, geometry, value
    @Action
    public syncWithER(store: InternalRepresentation, action: IRSyncWithERAction): InternalRepresentation {
        let graphModel = action.graphModel;
        if (store.pageUICDLs[action.id] == undefined || store.pageUICDLs[action.id].body.componentList == undefined)
            return store;

        // shallow copy
        store = {
            ...store,
            pageUICDLs: {
                ...store.pageUICDLs,
                [action.id]: {
                    ...store.pageUICDLs[action.id],
                    body: {
                        ...store.pageUICDLs[action.id].body,
                        componentList: [
                            ...store.pageUICDLs[action.id].body.componentList
                        ]
                    }
                }
            }
        }

        let firstLevelComponentList = store.pageUICDLs[action.id].body.componentList;
        for (let index = 0; index < firstLevelComponentList.length; index++) {
            store.pageUICDLs[action.id].body.componentList = [...store.pageUICDLs[action.id].body.componentList];

            let firstLevelCells = this.findCell(graphModel, firstLevelComponentList[index].id);
            if (firstLevelCells.length > 0) {
                // do data-binding hereee
                for (let key in firstLevelCells) {
                    let cell = firstLevelCells[key];
                    if (cell['dataBinding']['hasDataBinding']) {
                        store.pageUICDLs[action.id].body.componentList[index] = {
                            ...store.pageUICDLs[action.id].body.componentList[index],
                            [cell['dataBinding']['dataBindingName']]: cell['value'],
                            geometry: cell['geometry'],
                            style: cell['style']
                        }
                    }
                    else {
                        store.pageUICDLs[action.id].body.componentList[index] = {
                            ...store.pageUICDLs[action.id].body.componentList[index],
                            geometry: cell['geometry'],
                            style: cell['style']
                        }
                    }
                }
            }

            if (firstLevelComponentList[index].componentList == undefined)
                continue;
            else {
                store.pageUICDLs[action.id].body.componentList[index] = {
                    ...store.pageUICDLs[action.id].body.componentList[index],
                    componentList: [
                        ...store.pageUICDLs[action.id].body.componentList[index].componentList
                    ]
                }
                let secondLevelComponentList = firstLevelComponentList[index].componentList;
                for (let j = 0; j < secondLevelComponentList.length; j++) {
                    let secondLevelCells = this.findCell(graphModel, secondLevelComponentList[j].id);
                    if (secondLevelCells.length > 0) {
                        // do data-binding hereee
                        console.log('second level');
                        console.log(secondLevelCells);
                        for (let key in secondLevelCells) {
                            let cell = secondLevelCells[key];
                            if (cell['dataBinding']['hasDataBinding']) {
                                store.pageUICDLs[action.id].body.componentList[index].componentList[j] = {
                                    ...store.pageUICDLs[action.id].body.componentList[index].componentList[j],
                                    [cell['dataBinding']['dataBindingName']]: cell['value'],
                                    geometry: cell['geometry'],
                                    style: cell['style']
                                }
                            }
                            else {
                                store.pageUICDLs[action.id].body.componentList[index].componentList[j] = {
                                    ...store.pageUICDLs[action.id].body.componentList[index].componentList[j],
                                    geometry: cell['geometry'],
                                    style: cell['style']
                                }
                            }
                        }
                    }
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

        store.themes = [...store.themes];
        store.themes[action.selectedThemeIndex] = { ...store.themes[action.selectedThemeIndex] };
        store.themes[action.selectedThemeIndex].pages = [...store.themes[action.selectedThemeIndex].pages];
        store.themes[action.selectedThemeIndex].pages.splice(action.pageIndex, 1);
        return store;
    }

    @Action
    public renamePage(store: InternalRepresentation, action: IRRenamePageAction): InternalRepresentation {
        let oldName = store.pageUICDLs[action.id].name;
        store = {
            ...store,
            pageUICDLs: {
                ...store.pageUICDLs,
                [action.id]: {
                    ...store.pageUICDLs[action.id],
                    name: action.pageName
                }
            }
        }

        store.navigationDL = { ...store.navigationDL };
        store.navigationDL["children"] = [...store.navigationDL["children"]];
        for (let i = 0; i < store.navigationDL["children"].length; i++) {
            if (store.navigationDL["children"][i]["component"] == oldName) {
                store.navigationDL["children"][i] = { ...store.navigationDL["children"][i] }
                store.navigationDL["children"][i]["component"] = { ...store.navigationDL["children"][i]["component"] }
                store.navigationDL["children"][i]["path"] = { ...store.navigationDL["children"][i]["path"] }
                store.navigationDL["children"][i]["component"] = action.pageName
                store.navigationDL["children"][i]["path"] = action.pageName
            }
        }

        return produce(store, draft => {
            if (action.pageName == 'imsMain') {
                store.pageUICDLs[action.id].isMain = true;
            }
            draft.themes[action.themeIndex].pages[action.pageIndex].name = action.pageName
        })
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
        console.log(action);
        store = { ...store };
        store.pageUICDLs = { ...store.pageUICDLs };
        let id = action.id;
        store.pageUICDLs[id] = ({ ...store.pageUICDLs[id] } as any)
        store.pageUICDLs[id].body = ({ ...store.pageUICDLs[id].body } as any)
        store.pageUICDLs[id].body.componentList = ([...store.pageUICDLs[id].body.componentList, action.uiComponent] as any)
        return store;
    }

    @Action
    public AddNDLEdge(store: InternalRepresentation, action: IRAddNDLEdgeAction): InternalRepresentation {
        store = { ...store }
        store.navigationDL = { ...store.navigationDL };
        store.navigationDL['children'] = [...store.navigationDL['children']]

        let source = action.edgeInfo["source"];
        let target = action.edgeInfo["target"];
        let parameter = action.edgeInfo["parameter"]
        let sourceComponentSelector = source['componentSelector']
        for (let index = 0; index < store.navigationDL['children'].length; index++) {
            if (store.navigationDL['children'][index]['component'] == source['pageName']) {
                store.navigationDL['children'][index] = { ...store.navigationDL['children'][index] }

                let pageNDL = store.navigationDL['children'][index]
                if (!pageNDL['destination'].includes(target['pageName'])) {
                    store.navigationDL['children'][index]['destination'] = [...store.navigationDL['children'][index]['destination'], target['pageName']]
                }
                store.navigationDL['children'][index]["edges"] = { ...store.navigationDL['children'][index]["edges"] }
                pageNDL['edges'][sourceComponentSelector] = { ...pageNDL['edges'][sourceComponentSelector] }

                pageNDL['edges'][sourceComponentSelector] = {
                    "target": target["pageName"],
                    "parameter": ""
                }
                if (parameter != undefined && parameter.length > 0) {
                    pageNDL['edges'][sourceComponentSelector]['parameter'] = { ...pageNDL['edges'][sourceComponentSelector]['parameter'] }
                    pageNDL['edges'][sourceComponentSelector]['parameter'] = parameter;
                }
            }

            if (parameter != undefined && parameter.length > 0
                && store.navigationDL['children'][index]['component'] == target['pageName']
                && !store.navigationDL['children'][index]["parameters"].includes(parameter)) {
                store.navigationDL['children'][index] = { ...store.navigationDL['children'][index] }
                store.navigationDL['children'][index]["parameters"] = [...store.navigationDL['children'][index]["parameters"]]
                store.navigationDL['children'][index]["parameters"] = [...store.navigationDL['children'][index]["parameters"], parameter]
            }
        }
        return store
    }

    @Action
    public addNDLPage(store: InternalRepresentation, action: IRInsertNDLPageAction): InternalRepresentation {
        store = { ...store }
        store.navigationDL = { ...store.navigationDL };
        console.log(store.navigationDL)
        store.navigationDL["children"] = [...store.navigationDL["children"]];
        console.log(typeof (store.navigationDL["children"]))

        console.log(store.navigationDL["children"])
        store.navigationDL["children"].push({
            'selector': action.pageUICDL['id'],
            'component': action.pageUICDL['name'],
            'path': action.pageUICDL['name'],
            'category': 'page',
            'isMain': action.pageUICDL['isMain'],
            'destination': [],
            'parameters': [],
            'children': [],
            'edges': {}
        })
        return store
    }

    @Action
    public deleteNDLPage(store: InternalRepresentation, action: IRDeleteNDLPageAction): InternalRepresentation {
        store = { ...store }
        store.navigationDL = { ...store.navigationDL };
        store.navigationDL["children"] = [...store.navigationDL["children"]];
        let pages = store.navigationDL["children"];
        let findIndex = -1
        for (let index = 0; index < pages.length; index++) {
            if (pages[index]["component"] == action.pageName) {
                findIndex = index;
            }
        }
        if (findIndex >= 0 && findIndex < pages.length) {
            store.navigationDL["children"].splice(findIndex, 1)
        }
        return store;
    }

    @Action
    public initialNDL(store: InternalRepresentation, action: IRInitialNDLAction): InternalRepresentation {
        store = { ...store }
        store.navigationDL = { ...store.navigationDL };
        store.navigationDL = {
            "selector": "DefaultLayout",
            "component": "DefaultLayoutComponent",
            "path": "",
            "category": "Layout",
            "children": []
        }
        console.log(store.navigationDL["children"])
        return store;
    }

    @Action
    public clearEdgeByTheme(store: InternalRepresentation, action: IRClearNDLThemeEdgeAction): InternalRepresentation {
        store = { ...store }
        store.navigationDL = { ...store.navigationDL };
        store.navigationDL['children'] = [...store.navigationDL['children']]
        for (let index = 0; index < store.navigationDL['children'].length; index++) {
            let pageName = store.navigationDL['children'][index]["component"]
            if (this.isPageInTheme(store, action.themeIndex, pageName)) {
                store.navigationDL['children'][index] = { ...store.navigationDL['children'][index] }
                let pageNDL = store.navigationDL['children'][index]

                // destination
                for (let j = 0; index < pageNDL["destination"].length; index++) {
                    pageNDL["destination"] = [...pageNDL["destination"]]
                    if (this.isPageInTheme(store, action.themeIndex, pageNDL["destination"][j])) {
                        pageNDL["destination"].splice(j, 1);
                    }
                }
                // edge
                pageNDL["edges"] = { ...pageNDL["edges"] }
                for (let sourceComponentSelector in pageNDL["edges"]) {
                    if (this.isPageInTheme(store, action.themeIndex, pageNDL["edges"][sourceComponentSelector]["target"])) {
                        pageNDL["edges"][sourceComponentSelector] = { ...pageNDL["edges"][sourceComponentSelector] }
                        console.log("debug 1")
                        delete pageNDL["edges"][sourceComponentSelector]
                        console.log("debug 2")
                    }
                }

                // parameters

            }
        }
        return store;

    }

    public isPageInTheme(store: InternalRepresentation, themeIndex: number, pageName: string) {

        for (let j = 0; j < store.themes[themeIndex].pages.length; j++) {
            if (store.themes[themeIndex].pages[j].name == pageName) {
                return true;
            }
        }
        return false;

    }


}

export const internalRepresentationReducer = createReducer(InternalRepresentationReducer)