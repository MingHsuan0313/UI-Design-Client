import { elementAttribute } from "@angular/core/src/render3/instructions";
import VertexStorage from "./vertex-storage.model";
import EdgeStorage from "./edge-storage.model";

export class GraphStorage {
    vertexList: VertexStorage[];
    edgeList: EdgeStorage[];
    graphModel: mxGraphModel;
    graph: mxGraph;

    // create graph
    constructor(element) {
        this.vertexList = []
        this.edgeList = []
        this.graphModel = new mxGraphModel();
        this.graph = new mxGraph(element, this.graphModel);
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
    insertVertex(parent, vertexID, vertexValue, x, y, width, height) {
        let vertex;
        try {
            if(parent == "1") {
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
            vertex = this.graph.insertVertex(parent, vertexID, vertexValue, x, y, width, height);
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
}