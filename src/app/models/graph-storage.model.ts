import { elementAttribute } from "@angular/core/src/render3/instructions";
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
        let style = new Object();
        style["opacity"] = '0'
        style["fontSize"] = "15"
        this.getGraph().getStylesheet().putCellStyle("textStyle", style)
    }

    bindComponent(component, parent) {
        console.log("bind component hereee")
        console.log(component)
        // console.log("Component Value Hereee")
        // console.log(component[Storage.getComponentValue(component["type"])]);
        // basic component
        if (component["componentList"] == undefined) {
            let vertexID = component["id"];
            // console.log(Storage)
            let valueKey = Storage.getComponentValue(component["type"]);
            let vertexValue = component[valueKey];
            let vertex = this.insertVertex(parent, vertexID, vertexValue, 20, 100, 50, 50,component["type"]+"Style");
            // console.log(this.getGraph().getStylesheet().styles["myStyle"])
            // this.getGraph().getStylesheet().styles["myStyle"]["fontSize"] = "100"
            // console.log(this.getGraph().getStylesheet().styles["myStyle"])

            // console.log("vertex hereeeee");
            // console.log(vertex);
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
            if (parent.id == "1") {
                parent = this.graph.getDefaultParent();
                console.log("parent")
                console.log(parent)
            }
            else {
                parent = this.findVertexByID(parent).vertex;
                console.log("parent")
                console.log(parent)
            }
            // const parent = this.graph.getDefaultParent();
            // console.log("this is parent")
            // console.log(parent)
            this.graph.getModel().beginUpdate();
            vertex = this.graph.insertVertex(parent, vertexID, vertexValue, x, y, width, height, style, "");
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