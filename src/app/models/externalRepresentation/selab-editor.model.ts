import { Store } from "@ngrx/store";
import GraphEditorService from "src/app/services/externalRepresentation/graph-editor.service";
import { Configuration } from "src/app/services/externalRepresentation/util/configuration";
import { ERInsertVertexAction } from "../store/actions/externalRepresentation.action";
import { AppState } from "../store/app.state";
import { pageUICDLSelector } from "../store/selectors/InternalRepresentationSelector";
import { SelabVertex } from "./selabVertex.model";
import { UIComponent } from "../ui-component-dependency";
import { BreadcrumbStrategy, ButtonStrategy, CardStrategy, DropdownStrategy, FormStrategy, IconStrategy, InputStrategy, LayoutStrategy, TableStrategy, TextStrategy } from "./component-strategy-dependency";
import { ICreateComponentStrategy } from "./createComponentStrategy/ICreateComponentStrategy";

export class SelabEditor {
    editor: mxEditor;
    id: string;
    store: Store<AppState>
    createComponentStrategy: ICreateComponentStrategy;

    constructor(element: HTMLElement,
        store: Store<AppState>,
        private graphEditorService: GraphEditorService) {
        this.initializeEditor(element, "assets/keyhandler.xml");
        this.id = element.id;
        this.store = store;
    }

    initializeEditor(element: HTMLElement, configurePath: string): void {
        let editor = new mxEditor();
        editor.setGraphContainer(element);
        let graph: mxGraph = editor.graph;
        graph.setConnectable(true);
        let config = mxUtils.load(configurePath).getDocumentElement();
        editor.configure(config);
        Configuration.configureEditorKeyBinding(editor);
        Configuration.configureGraphListener(editor);

        //mxConstants.DEFAULT_HOTSPOT = 0.7;
        mxConstants.HIGHLIGHT_COLOR = null; 
        console.log(mxConstants)
        mxConnectionHandler.prototype.connectImage = new mxImage('assets/icon/dot.svg', 14, 14);
        mxCellMarker.prototype.hotspotEnabled = true;
        //mxCellMarker.prototype.setHotspot(1); 


        this.editor = editor;
    }

    getEditor(): mxEditor {
        return this.editor;
    }

    getGraph(): mxGraph {
        return this.editor.graph;
    }

    getGraphModel(): mxGraphModel {
        return this.editor.graph.model;
    }

    getGraphView(): mxGraphView {
        return this.editor.graph.view;
    }

    setStrategy(strategy: ICreateComponentStrategy) {
        this.createComponentStrategy = strategy;
    }

    applyLayout(layout: string) {
        console.log("apply Layout")
        let graphID = this.graphEditorService.getSelectedGraphID();
        this.setStrategy(new LayoutStrategy(0, 0,graphID));
        let pageUICDLs = this.store.select(pageUICDLSelector());
        pageUICDLs.subscribe((data) => {
            let id = this.graphEditorService.getSelectedGraphID();
            console.log(data[id]);
            (this.createComponentStrategy as LayoutStrategy).createLayoutComponent(this, data[id]);
        });

    }

    insertVertex(selabVertex: SelabVertex, component: UIComponent, geometry: mxGeometry, style: object): mxCell {
        let vertex;
        let id = selabVertex.getID();
        let value = selabVertex.getValue();
        let parent = this.getVertexByID(selabVertex.getParentID());
        let styleDescription = this.convertJsonObjectToStyleDescription(style);
        try {
            this.getGraph().getModel().beginUpdate();
            vertex = this.getGraph()
                .insertVertex(parent, id, value,
                    geometry.x, geometry.y, geometry.width, geometry.height,
                    styleDescription, "")
            vertex["selector"] = component.selector;
            vertex["type"] = component.type;
            let graphID = this.graphEditorService.getSelectedGraphID();
            this.store.dispatch(new ERInsertVertexAction(graphID, selabVertex));
        } finally {
            this.getGraph().getModel().endUpdate();
        }
        this.getGraph().refresh();
        return vertex;
    }

    createComponent(uiComponent: UIComponent, parent: mxCell, basex?, basey?) {
        let graphID = this.graphEditorService.getSelectedGraphID();
        console.log("create Component")
        console.log(graphID)
        const graphNode = document.getElementById(graphID);
        const defaultWidth = graphNode.offsetWidth;
        const defaultHeight = graphNode.offsetHeight;

        if (uiComponent['type'].startsWith('layout')) {
            basex = 0;
            basey = 0;
        } else if (basex == undefined || basey == undefined) {
            basex = defaultWidth * 3 / 10;
            basey = defaultHeight * 3 / 10;
        }

        // set parent [layout parts] to each components
        if (parent.id < 8) {
        }

        if (uiComponent['componentList'] == undefined) {
            if (uiComponent['type'] == 'button') {
                this.setStrategy(new ButtonStrategy(basex, basey));
            } else if (uiComponent['type'] == 'text') {
                this.setStrategy(new TextStrategy(basex, basey));
            } else if (uiComponent['type'] == 'dropdown') {
                this.setStrategy(new DropdownStrategy(basex, basey));
            } else if (uiComponent['type'] == 'table') {
                this.setStrategy(new TableStrategy(basex, basey));
            } else if (uiComponent['type'] == 'icon') {
                this.setStrategy(new IconStrategy(basex, basey));
            } else if (uiComponent['type'].startsWith('input')) {
                this.setStrategy(new InputStrategy(basex, basey));
            }
            return this.createComponentStrategy.createComponent(this, uiComponent, parent);
        } else {
            if (uiComponent['type'] == 'card') {
                this.setStrategy(new CardStrategy(basex, basey));
            } else if (uiComponent['type'] == 'breadcrumb') {
                this.setStrategy(new BreadcrumbStrategy(basex, basey));
            } else if (uiComponent['type'] == 'form') {
                this.setStrategy(new FormStrategy(basex, basey));
            } const compositeVertexStorage = this.createComponentStrategy.createComponent(this, uiComponent, parent);
            return compositeVertexStorage;
        }
    }

    getVertexByID(id: string): mxCell {
        let model = this.getGraphModel();
        let cells = model.cells;
        if (id in cells)
            return cells[id];
        else
            return null;
    }

    convertJsonObjectToStyleDescription(styleObj: any): String {
        let styleDescription = "";
        let styleKeys = Object.keys(styleObj);
        for (let index = 0; index < styleKeys.length; index++) {
            let key = styleKeys[index];
            if (styleObj[key] == undefined)
                continue
            if (index == styleKeys.length - 1)
                styleDescription = styleDescription + `${key}=${styleObj[key]};`
            else
                styleDescription = styleDescription + `${key}=${styleObj[key]};`
        }
        return styleDescription;
    }
}