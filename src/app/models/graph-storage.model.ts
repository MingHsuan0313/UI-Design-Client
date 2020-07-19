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
import { CardStrategy } from "./strategy/CardStrategy";

export class GraphStorage {
    vertexStorageList: VertexStorage[];
    edgeStorageList: EdgeStorage[];
    graphModel: mxGraphModel;
    graph: mxGraph;
    id: string;
    strategy: ICreateComponentStrategy;
    last_x: number;

    // create graph
    constructor(element, id) {
        this.vertexStorageList = [];
        this.edgeStorageList = [];
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
        console.log("start sync storage");
        console.log(this);

        for(let vertexStorage of this.vertexStorageList) {
            vertexStorage.sync();
        }
    }

    setStrategy(strategy:ICreateComponentStrategy) {
        this.strategy = strategy;
    }

    createComponent(component, parent,basex?,basey?) {
        console.log("bind component heree")
        console.log(component)

        // basic component
        if (component["componentList"] == undefined) {
            if(component["type"] == "button")  {
                this.setStrategy(new ButtonStrategy(basex,basey));
            }
            else if(component["type"] == "text") {
                this.setStrategy(new TextStrategy(basex,basey));
            }
            else if(component["type"] == "dropdown") {
                this.setStrategy(new DropdownStrategy(basex,basey));
            }
            else if(component["type"] == "table") {
                this.setStrategy(new TableStrategy(basex,basey));
            }

            console.log(this.strategy.strategyName)
            this.strategy.createComponent(this,component,parent);

        }
        //composite component here
        else {
            if(component["type"] == "card"){
                this.setStrategy(new CardStrategy(basex,basey));
            }
            this.strategy.createComponent(this,component,parent);
        }
    }

    getGraph() {
        return this.graph;
    }

    // insert vertex
    insertVertex(parent, vertexID, vertexValue,geometry,styleStorage,uicomponent,dataBinding?) {
        let vertex;
        console.log("parent here")
        console.log(parent)
        try {
            this.graph.getModel().beginUpdate();
            vertex = this.graph.insertVertex(parent, vertexID, vertexValue, geometry.x,geometry.y , geometry.width, geometry.height,styleStorage.name , "");
        } finally {
            this.graph.getModel().endUpdate();
            // new mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
        }

        let vertexStorage = new VertexStorage(vertex,styleStorage,uicomponent,dataBinding);
        this.vertexStorageList.push(vertexStorage);
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
            // new mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
        }
        let edgeModel = new EdgeStorage(edge);
        this.edgeStorageList.push(edgeModel);
        return edge;
    }

    findVertexByID(id) {
        for (let element of this.vertexStorageList) {
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