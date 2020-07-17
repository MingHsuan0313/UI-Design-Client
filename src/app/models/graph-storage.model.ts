import VertexStorage from "./vertex-storage.model";
import EdgeStorage from "./edge-storage.model";
import { Storage } from "./../shared/storage";

export class GraphStorage {
    vertexList: VertexStorage[];
    edgeList: EdgeStorage[];
    graphModel: mxGraphModel;
    graph: mxGraph;
    id: string;

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

    createComponent(component, parent) {
        console.log("bind component heree")
        console.log(component)
        console.log(parent)
        // basic component
        if (component["componentList"] == undefined) {
            console.log("this is basic component")
            let vertexID = component["id"];
            // console.log(Storage)
            let valueKey = Storage.getComponentValue(component["type"]);
            let vertexValue = component[valueKey];
            let vertex = this.insertVertex(parent, vertexID, vertexValue, 20, 100, 50, 50, component["type"] + "Style");
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

    // issue : won't rerender imediately
    changeVertexValue(vertexID, newValue) {
        try {
            this.graph.getModel().beginUpdate();
            let vertexModel = this.findVertexByID(vertexID);
            if (vertexModel != null) {
                vertexModel.changeValue(newValue);
                // console.log("changged")
                // console.log(this.graph)
            }
            else
                console.log("Vertex not found");
        } finally {
            this.graph.getModel().endUpdate();
            new mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
        }
    }

    // insert vertex
    insertVertex(parent, vertexID, vertexValue, x, y, width, height, style) {
        let vertex;
        try {
            // if (parent.id == "1") {
            //     parent = this.graph.getDefaultParent();
            //     console.log("parent")
            //     console.log(parent)
            // }
            // else {
            //     parent = this.findVertexByID(parent).vertex;
            //     console.log("parent")
            //     console.log(parent)
            // }
            // const parent = this.graph.getDefaultParent();
            // console.log("this is parent")
            // console.log(parent)
            console.log("ready to insert vertex")
            console.log(parent)
            console.log(vertexID)
            console.log(vertexValue)
            console.log(style)
            this.graph.getModel().beginUpdate();
            vertex = this.graph.insertVertex(parent, vertexID, vertexValue, x, y, width, height, style, "");
            // var obj = document.getElementById("testing")
            var obj = document.createElement("button")
            console.log("object here")
            console.log(obj)
            obj.setAttribute('label', 'click me');
            var v1 = this.graph.insertVertex(parent, null, obj, 0, 0, width, height)

            // vertex.valueChanged("ajdasdjh")

        } finally {
            this.graph.getModel().endUpdate();
            new mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
        }

        let vertexModel = new VertexStorage(vertex);
        // vertexModel.changeValue("Heaeklwqjqej")
        // console.log(this.graph)
        this.vertexList.push(vertexModel);
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
}