import { elementAttribute } from "@angular/core/src/render3/instructions";

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
    }

    changeVertexValue(vertexID, newValue) {
        try {
            this.graph.getModel().beginUpdate();
            let vertex = this.findVertexByID(vertexID);
            if(vertex != null)
                vertex.changeValue(newValue);
            else
                console.log("Vertex not found");
        } finally {
            this.graph.getModel().endUpdate();
            new mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
        }
    }

    // insert vertex
    insertVertex(parentVertexID, vertexValue, x, y, width, height) {
        let vertex;
        try {
            const parent = this.graph.getDefaultParent();
            console.log("this is parent")
            console.log(parent)
            this.graph.getModel().beginUpdate();
            vertex = this.graph.insertVertex(parent, parent.id, vertexValue, x, y, width, height);
            // vertex.valueChanged("ajdasdjh")

        } finally {
            this.graph.getModel().endUpdate();
            new mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
        }
        let vertexModel = new VertexStorage(vertex);
        vertexModel.changeValue("Heaeklwqjqej")
        console.log(this.graph)
        this.vertexList.push(vertexModel);
        return vertex;
    }

    // insert edge
    insertEdge(sourceVertex, targetVertex) {
        let edge;
        try {
            const parent = this.graph.getDefaultParent();
            this.graph.getModel().beginUpdate();
            edge = this.graph.createEdge(parent, '', '', sourceVertex, targetVertex, "");

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
            console.log(element)
            console.log(id)
            if (element.id == id)
                return element;
        }
        // not found
        // return -1;
    }
}

export class VertexStorage {
    vertex: any;
    x: String;
    y: String;
    width: number;
    height: number;
    id: string;
    parentId: string;
    value: string;

    changeValue(value) {
        this.vertex.valueChanged(value);
    }

    constructor(vertex) {
        this.vertex = vertex;
        this.x = this.vertex["geometry"]["x"]
        this.y = this.vertex["geometry"]["y"]
        this.width = this.vertex["geometry"]["width"]
        this.height = this.vertex["geometry"]["height"]
        this.value = this.vertex["value"]
        this.id = this.vertex["id"]
        console.log(this)
    }
}

export class EdgeStorage {
    edge: any;
    sourceID: string;
    targetID: string;

    constructor(edge) {
        this.edge = edge;
        console.log(edge);
    }
}