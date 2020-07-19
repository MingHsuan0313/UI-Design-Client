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
                    // console.log("mouse down");
                    // console.log(evt);
                },
                mouseMove: function (sender, evt) {
                },
                mouseUp: function (sender, evt) {
                    // console.log("mouse up");
                    // console.log(evt);
                }
            }
        )
    }

    // sync internal storage and external storage
    syncStorage() {
        for(let vertexStorage of this.vertexStorageList) {
            vertexStorage.sync();
        }
    }

    setStrategy(strategy:ICreateComponentStrategy) {
        this.strategy = strategy;
    }

    createComponent(component, parent,basex?,basey?) {
        if(basex == undefined || basey == undefined) {
            basex = 0;
            basey = 0;
        }

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

            return this.strategy.createComponent(this,component,parent);
        }
        //composite component here
        else {
            if(component["type"] == "card") {
                this.setStrategy(new CardStrategy());
            }

            let compositeComponentVertexStorage = this.strategy.createComponent(this,component,parent);
            let basex = 0;
            let basey = 0;
            for(let element of component.componentList) {
                let obj = this.createComponent(element,compositeComponentVertexStorage.getVertex(),basex,basey);
                console.log("create component heree")
                console.log(obj)
                basey = basey + obj['height'];
            }

            // let type = component.type;
            // let styleName = type + "style" + component.id;
            // let style = StyleLibrary[0][type];
            // let styleStorage = new StyleStorage(styleName,style);
            // this.graph.getStylesheet().putCellStyle(styleName,style);
            // let compositeComponentGeometry = new mxGeometry(0,0,300,300);
            // let compositeVertexStorage = this.insertVertex(parent,component.id,component.header,compositeComponentGeometry,styleStorage,component);
            // for(let element of component.componentList) {
            //     this.createComponent(element,compositeVertexStorage.getVertex());
            // }
        }
    }

    getGraph() {
        return this.graph;
    }

    // insert vertex
    insertVertex(parent, vertexID, vertexValue,geometry,styleStorage,uicomponent,dataBinding?) {
        let vertex;
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