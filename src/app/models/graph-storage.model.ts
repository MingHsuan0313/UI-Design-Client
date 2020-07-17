import VertexStorage from "./vertex-storage.model";
import EdgeStorage from "./edge-storage.model";
import { Storage } from "./../shared/storage";
import { ICreateComponentStrategy } from "./strategy/ICreateComponentStrategy";
import { ButtonStrategy } from "./strategy/ButtonStrategy";
import { TextStrategy } from "./strategy/TextStrategy";
import { DropdownStrategy } from "./strategy/DropdownStrategy";

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
        this.createStyle()
        this.graph.addMouseListener(
            {
                mouseDown: function (sender, evt) {
                    console.log("mouse down");
                    // console.log(sender)
                    console.log(evt);
                },
                mouseMove: function (sender, evt) {
                    // console.log("mouse move");
                    // // console.log(sender)
                    // console.log(evt);
                },
                mouseUp: function (sender, evt) {
                    console.log("mouse up");
                    // console.log(sender)
                    console.log(evt);
                    // mxLog.debug('mouseUp');
                }
            }
        )
    }

    setStrategy(strategy:ICreateComponentStrategy) {
        this.strategy = strategy;
    }

    createStyle() {
        let textStyle = new Object();
        textStyle["opacity"] = '0';
        textStyle["fontSize"] = "15";
        textStyle["fontColor"] = "green";
        // textStyle["indicatorStrokeColor"] = "green"
        this.getGraph().getStylesheet().putCellStyle("textStyle", textStyle);
        console.log("all style heree")
        console.log(this.getGraph().getStylesheet())

        let buttonStyle = new Object();
        buttonStyle["fontSize"] = "18";
        buttonStyle["fontColor"] = "#fff";
        buttonStyle['fillColor'] = "#5bc0de";
        buttonStyle['rounded'] = true;
        buttonStyle['strokeColor'] = "#269abc"
        // buttonStyle['labelBorderColor'] = "#269abc"
        this.getGraph().getStylesheet().putCellStyle("buttonStyle", buttonStyle);
        console.log("akjds")
        console.log(this.getGraph().getStylesheet()["styles"]["textStyle"])
        // this.getGraph().getStylesheet()["styles"]["textStyle"]["fontColor"] = "red";
    }

    createComponent(component, parent,x?,y?) {
        console.log("bind component heree")
        console.log(component)
        console.log(parent)

        // basic component
        if (component["componentList"] == undefined) {
            if(component["type"] == "button")  {
                this.setStrategy(new ButtonStrategy())
            }
            else if(component["type"] == "text") {
                this.setStrategy(new TextStrategy())
            }
            else if(component["type"] == "dropdown") {
                this.setStrategy(new DropdownStrategy())
            }

            console.log(this.strategy.strategyName)
            this.strategy.createComponent(this,component,parent);
            // let vertexID = component["id"];
            // // console.log(Storage)
            // let valueKey = Storage.getComponentValue(component["type"]);
            // let vertexValue = component[valueKey];
            // let vertex = this.insertVertex(parent, vertexID, vertexValue, 50, 50, component["type"] + "Style");
        }
        else {
            // insert vertex
            // bind component
        }
        console.log("external representation heree")
        console.log(this)
    }

    getGraph() {
        return this.graph;
    }

    // insert vertex
    insertVertex(parent, vertexID, vertexValue, width, height, styleStorage,uicomponent) {
        console.log("style heree")
        console.log(styleStorage)
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
        return vertex;
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
        console.log("hello")
        console.log(this.getGraph())
        // return this.getGraph().tooltipHandler;
        return "s"
    }
}