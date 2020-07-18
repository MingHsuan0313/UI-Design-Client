import VertexStorage from "./vertex-storage.model";
import EdgeStorage from "./edge-storage.model";
import { Storage } from "./../shared/storage";
import { ICreateComponentStrategy } from "./strategy/ICreateComponentStrategy";
import { ButtonStrategy } from "./strategy/ButtonStrategy";
import { TextStrategy } from "./strategy/TextStrategy";
import { DropdownStrategy } from "./strategy/DropdownStrategy";
import { TableStrategy } from "./strategy/TableStrategy";
import { StyleLibrary } from "../shared/styleLibrary";
import StyleStorage from "./style-storage.model";

export class GraphStorage {
    vertexList: VertexStorage[];
    edgeList: EdgeStorage[];
    graphModel: mxGraphModel;
    graph: mxGraph;
    id: string;
    strategy: ICreateComponentStrategy;

    // create graph
    constructor(element, id) {
        this.vertexList = [];
        this.edgeList = [];
        this.id = id;
        this.graphModel = new mxGraphModel();
        this.graph = new mxGraph(element, this.graphModel);
        this.graph.addMouseListener(
            {
                mouseDown: function (sender, evt) {
                    console.log("mouse down");
                    console.log(evt);
                },
                mouseMove: function (sender, evt) {
                },
                mouseUp: function (sender, evt) {
                    console.log("mouse up");
                    console.log(evt);
                }
            }
        )
    }

    // sync internal storage and external storage
    syncStorage() {

    }

    setStrategy(strategy:ICreateComponentStrategy) {
        this.strategy = strategy;
    }

    createComponent(component, parent,x?,y?) {
        console.log("bind component heree")
        console.log(component)

        // basic component
        if (component["componentList"] == undefined) {
            if(component["type"] == "button")  {
                this.setStrategy(new ButtonStrategy());
            }
            else if(component["type"] == "text") {
                this.setStrategy(new TextStrategy());
            }
            else if(component["type"] == "dropdown") {
                this.setStrategy(new DropdownStrategy());
            }
            else if(component["type"] == "table") {
                this.setStrategy(new TableStrategy());
            }

            console.log(this.strategy.strategyName)
            this.strategy.createComponent(this,component,parent);
        }
        //composite component here
        else {
            let type = component.type;
            let styleName = type + "style" + component.id;
            let style = StyleLibrary[0][type];
            let styleStorage = new StyleStorage(styleName,style);
            this.graph.getStylesheet().putCellStyle(styleName,style);
            let compositeVertex = this.insertVertex(parent,component.id,component.header,200,100,styleStorage,component);
            for(let element of component.componentList) {
                this.createComponent(element,compositeVertex);
            }
        }
    }

    getGraph() {
        return this.graph;
    }

    // insert vertex
    insertVertex(parent, vertexID, vertexValue, width, height, styleStorage,uicomponent) {
        let vertex;
        try {
            this.graph.getModel().beginUpdate();
            vertex = this.graph.insertVertex(parent, vertexID, vertexValue, 0, 0, width, height,styleStorage.name , "");
        } finally {
            this.graph.getModel().endUpdate();
            new mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
        }

        let vertexStorage = new VertexStorage(vertex,styleStorage,uicomponent);
        this.vertexList.push(vertexStorage);
        return vertexStorage;
    }

    // insert edge
    insertEdge(sourceVertex, targetVertex) {
        let edge;

        try {
            const parent = this.graph.getDefaultParent();
            this.graph.getModel().beginUpdate();
            edge = this.graph.insertEdge(parent, '', '', sourceVertex, targetVertex, "");

        } finally {
            this.graph.getModel().endUpdate();
            new mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
        }
        let edgeModel = new EdgeStorage(edge);
        this.edgeList.push(edgeModel);
        return edge;
    }

    findVertexByID(id) {
        for (let element of this.vertexList) {
            if (element.id == id)
                return element;
        }
        // not found
        // return -1;
    }

    getID() {
        return this.id;
    }

    getLastVertexGeometry() {
    }
}