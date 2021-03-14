import { GraphConfiguration } from 'src/app/models/externalRepresentation/util/graph-configuration';
import EdgeStorage from './edge-storage.model';
import VertexStorage from './vertext-storage.model';

export class GraphStorage {
  vertexStorageList: {}; //{index:VertexStorage}
  edgeStorageList: EdgeStorage[];
  editor: mxEditor;
  graphModel: mxGraphModel;
  graph: mxGraph;
  id: string;
  graphConfiguration: GraphConfiguration;
  edgeIdCnt: number = -1;  // TODO: temporary solution, start from -1 to avoid conflict with getMaxId()

  // create graph
  constructor(element, id) {
    this.vertexStorageList = {};
    this.edgeStorageList = [];
    this.id = id;

    this.initializeEditor(element, "assets/keyhandler.xml");
    this.graphConfiguration = new GraphConfiguration(this);
  }

  initializeEditor(element, filePath) {
    this.editor = new mxEditor();
    this.graph = this.editor.graph;
    this.editor.setGraphContainer(element);
    this.graph.setConnectable(true);
    this.graphModel = this.graph.getModel();
    let config = mxUtils.load(filePath).getDocumentElement();
    this.editor.configure(config);
  }

  getGraph() {
    return this.graph;
  }

  getGraphModel() {
    return this.graphModel;
  }

  // insert SVG vertex
  insertSVGVertex(parent, vertexID, BPELComponent, geometry, styleStorage, svg) {
    let vertex;

    try {
      this.graph.getModel().beginUpdate();
      vertex = this.graph.insertVertex(parent, vertexID, BPELComponent.getComponentName(), geometry.x, geometry.y, geometry.width, geometry.height, svg, null);
    } finally {
      this.graph.getModel().endUpdate();
    }
    let cloneStyle = {};
    Object.assign(cloneStyle, styleStorage.style);
    styleStorage.style = cloneStyle;
    const vertexStorage = new VertexStorage(vertex, styleStorage, BPELComponent, null, null);
    let vertexLength = Object.keys(this.vertexStorageList).length;
    this.vertexStorageList[vertexLength] = vertexStorage;
    // BPELComponent.setVertexStorage(vertexStorage);
    return vertexStorage;
  }

  insertEdge(sourceVertex, targetVertex) {
    let edge;

    try {
      const parent = this.graph.getDefaultParent();
      let style = new Object();
      style[mxConstants.STYLE_FONTSIZE] = 16;
      this.graph.getStylesheet().putCellStyle('edgeStyle', style);
      this.graph.getModel().beginUpdate();
      edge = this.graph.insertEdge(parent, String(this.edgeIdCnt), '', sourceVertex, targetVertex, 'edgeStyle');
      this.edgeIdCnt -= 1;
    } finally {
      this.graph.getModel().endUpdate();
    }
    const edgeModel = new EdgeStorage(edge);
    this.edgeStorageList.push(edgeModel);
    return edge;
  }

  findVertexByID(id) {
    for (let key in this.vertexStorageList) {
      if (this.vertexStorageList[key].id == id) {
        return this.vertexStorageList[key].vertex;
      }
    }
  }

  findVertexStorageByID(id) {
    for (let key in this.vertexStorageList) {
      if (this.vertexStorageList[key].id == id) {
        return this.vertexStorageList[key];
      }
    }
  }

  findVertexKeyByID(id) {
    for (let key in this.vertexStorageList) {
      if (this.vertexStorageList[key].id == id)
        return key;
    }
  }

  getID() {
    return this.id;
  }

  clear() {
    this.edgeStorageList = [];
    this.vertexStorageList = [];
  }

  // find vertex in the edges
  findVertex(src) {
    for (const edgeStorage of this.edgeStorageList) {
      if (edgeStorage.source == src) {
        return edgeStorage.srcVertex;
      }
      if (edgeStorage.target == src) {
        return edgeStorage.targetVertex;
      }
    }
  }

  zoomTo(zoomFactor: any) {
    this.graph.zoomTo(zoomFactor, this.graph.centerZoom);
  }

  getMaxID() {
    let cellsObject = this.getGraphModel().cells;
    const cells = Object.values(cellsObject);

    console.log(cells);
    let maxID = cells.reduce((acc: number, cur: mxCell) => {
      // if edge has no id
      if (cur.id == "") {
        return acc
      }
      return Math.max(acc, parseInt(cur.id));
    }, 0);
    return maxID;
  }
}