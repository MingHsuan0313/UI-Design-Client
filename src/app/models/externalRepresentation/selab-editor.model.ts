import { Store } from "@ngrx/store";
import GraphEditorService from "src/app/services/externalRepresentation/graph-editor.service";
import { Configuration } from "src/app/services/externalRepresentation/util/configuration";
import { ERInsertVertexAction } from "../store/actions/externalRepresentation.action";
import { AppState } from "../store/app.state";
import { pageNameSelector, pageUICDLSelector } from "../store/selectors/InternalRepresentationSelector";
import { SelabVertex } from "./selabVertex.model";
import { UIComponent } from "../ui-component-dependency";
import { BreadcrumbStrategy, ButtonStrategy, CardStrategy, DropdownStrategy, FormStrategy, IconStrategy, InputStrategy, LayoutStrategy, TableStrategy, TextStrategy } from "./component-strategy-dependency";
import { ICreateComponentStrategy } from "./createComponentStrategy/ICreateComponentStrategy";
import { IRSetLayoutAction } from "../store/actions/internalRepresentation.action";
import { MatDialog } from "@angular/material";

export class SelabEditor {
    editor: mxEditor;
    id: string;
    createComponentStrategy: ICreateComponentStrategy;

    constructor(element: HTMLElement,
        private store: Store<AppState>,
        private graphEditorService: GraphEditorService,
        private dialog: MatDialog
    ) {
        this.initializeEditor(element, "assets/keyhandler.xml");
        this.id = element.id;
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

    setGraphModel(graphModel: mxGraphModel) {
        this.editor.graph.model = graphModel;
    }

    setStrategy(strategy: ICreateComponentStrategy) {
        this.createComponentStrategy = strategy;
    }

    setLayout(layout: string) {
        let graphID = this.graphEditorService.getSelectedPageId();
        this.store.dispatch(new IRSetLayoutAction(graphID, layout));
    }

    applyLayout(layout: string,themes, xOffset?, yOffset?) {
        let graphID = this.graphEditorService.getSelectedPageId();
        this.setStrategy(new LayoutStrategy(graphID, new mxGeometry(0, 0, 0, 0)));
        let pageUICDLs = this.store.select(pageUICDLSelector());
        let subscription = pageUICDLs.subscribe((data) => {
            let id = graphID;
            if (graphID == undefined)
                return;
            (this.createComponentStrategy as LayoutStrategy).createLayoutComponent(this, data[id], themes);
        });
        subscription.unsubscribe();
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
                .insertVertex(parent, 0, value,
                    geometry.x, geometry.y, geometry.width, geometry.height,
                    styleDescription, "")

            vertex['pageId'] = component.pageId;
            vertex["selector"] = component.selector;
            vertex["type"] = component.type;
            // let graphID = this.graphEditorService.getSelectedPageId();
            // this.store.dispatch(new ERInsertVertexAction(graphID, selabVertex));
        } finally {
            this.getGraph().getModel().endUpdate();
        }
        this.getGraph().refresh();
        return vertex;
    }

    createComponent(uiComponent: UIComponent, parent: mxCell, geometry?, restore?, xOffset?, yOffser?) {
        const graphNode = document.getElementById('graph-container');
        const defaultWidth = graphNode.offsetWidth;
        const defaultHeight = graphNode.offsetHeight;
        const restoreMode = restore == undefined ? false : restore;

        if (uiComponent['type'].startsWith('layout')) {
            geometry = { x: 0, y: 0 }
        } else if (geometry == undefined) {
            geometry = {
                x: defaultWidth * 3 / 10,
                y: defaultHeight * 3 / 10
            }
        }

        // set parent [layout parts] to each components
        if (parent.id < 8) {
        }

        if (uiComponent['componentList'] == undefined) {
            if (uiComponent['type'] == 'button') {
                this.setStrategy(new ButtonStrategy(geometry, restoreMode));
            } else if (uiComponent['type'] == 'text') {
                this.setStrategy(new TextStrategy(geometry, restoreMode));
            } else if (uiComponent['type'] == 'dropdown') {
                this.setStrategy(new DropdownStrategy(geometry, restoreMode));
            } else if (uiComponent['type'] == 'table') {
                this.setStrategy(new TableStrategy(geometry, restoreMode));
            } else if (uiComponent['type'] == 'icon') {
                this.setStrategy(new IconStrategy(geometry, restoreMode));
            } else if (uiComponent['type'].startsWith('input')) {
                this.setStrategy(new InputStrategy(geometry, restoreMode));
            }
            return this.createComponentStrategy.createComponent(this, uiComponent, parent);
        } else {
            if (uiComponent['type'] == 'card') {
                this.setStrategy(new CardStrategy(geometry, restoreMode));
            } else if (uiComponent['type'] == 'breadcrumb') {
                this.setStrategy(new BreadcrumbStrategy(geometry, restoreMode));
            } else if (uiComponent['type'] == 'form') {
                this.setStrategy(new FormStrategy(geometry, restoreMode));
            }
            const compositeVertexStorage = this.createComponentStrategy.createComponent(this, uiComponent, parent);
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