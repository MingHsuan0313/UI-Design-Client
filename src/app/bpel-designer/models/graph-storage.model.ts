import { GraphConfiguration } from 'src/app/models/externalRepresentation/util/graph-configuration';
import AbstractComponent from './AbstractComponent.model';
import { BPELComponentElement } from './components/BPELComponent-element.model';
import { BPELComponent } from './components/BPELComponent.model';
import { BPELComponentElementWithActivity } from './components/BPELComponentElementWithActivity.model';
import { BPELComponentElementWithActivityAndActivityList } from './components/BPELComponentElementWithActivityAndActivityList.model';
import { BPELComponentElementWithActivityList } from './components/BPELComponentElementWithActivityList.model';
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
    this.vertexStorageList[vertex.id] = vertexStorage;
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
    return undefined;
  }

  findVertexKeyByID(id) {
    for (let key in this.vertexStorageList) {
      if (this.vertexStorageList[key].id == id)
        return key;
    }
    // if not found, return -1
    return -1;
  }

  findEdgeIdxByID(id) {
    return this.edgeStorageList.findIndex((edge) => edge.id == id);
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

  deleteVertex(vertex: mxCell): void{
    let vertexStorage: VertexStorage = this.findVertexStorageByID(vertex.getId());
    let component: BPELComponent = vertexStorage.getComponent() as BPELComponent;

    // delete IR in the parent of the vertex
    let parent = vertex.getParent();
    if (parent["value"] != undefined) { // if not <process> component
      let parentVertexStorage: VertexStorage = this.findVertexStorageByID(parent.getId());
      let parentComponent: BPELComponent = parentVertexStorage.getComponent() as BPELComponent;
      let parentComponentElement: BPELComponentElement = parentComponent.getElement();

      if (parentComponentElement instanceof BPELComponentElementWithActivity) {
        parentComponentElement.setActivity(null);
      } else if (parentComponentElement instanceof BPELComponentElementWithActivityList) {
        parentComponentElement.removeActivityInList(component);
      } else if (parentComponentElement instanceof BPELComponentElementWithActivityAndActivityList) {
        if (parentComponentElement.hasActivity(component)) {
          parentComponentElement.setActivity(null);
        } else if (parentComponentElement.hasActivityInList(component)) {
          parentComponentElement.removeActivityInList(component);
        } else if (parentComponentElement.hasElseBranchActivityForIf(component)) {
          parentComponentElement.setElseBranchActivityForIf(null);
        }
      } else {
        throw new Error("parent component instance is not belonging one of the following: \
                        BPELComponentElementWithActivity, BPELComponentElementWithActivityList, BPELComponentElementWithActivityAndActivityList");
      }
    }

    // recursive delete all VertexStorage and EdgeStorage info
    this.deleteChildrenInVertexStorageAndEdgeStorage(vertex);

    // change to select the parent of the vertex
    this.graph.selectCellForEvent(parent, null);
    let me = new mxMouseEvent();
    me.evt = mxEvent.CLICK;
    me.consumed = true;
    this.graph.click(me);

    // delete itself's vertex storage
    delete this.vertexStorageList[this.findVertexKeyByID(vertex.getId())];
    me.consumed = false;

    // delete all edge storages, and re-link an edge between previos node and next node of the deleted vertex
    this.updateEdgeToBetweenPreviousCellAndNextCell(vertex);

    // delete cells
    try {
      this.graph.getModel().beginUpdate();
      this.graph.removeCells([vertex], true);
    } finally {
      this.graph.getModel().endUpdate();
    }
  }

  deleteChildrenInVertexStorageAndEdgeStorage(vertex: mxCell): void {
    for (let i = 0; i < vertex.getChildCount(); ++i) {
      let vertexStorageKey = this.findVertexKeyByID(vertex.getChildAt(i).getId());
      let edgeStorageIdx = this.findEdgeIdxByID(vertex.getChildAt(i).getId());
      if (vertexStorageKey == -1) {
        this.edgeStorageList.splice(edgeStorageIdx, edgeStorageIdx + 1);
      } else if (edgeStorageIdx == -1) {
        delete this.vertexStorageList[vertexStorageKey];
      }
    }
  }

  updateEdgeToBetweenPreviousCellAndNextCell(vertex: mxCell): void {
    let edgeCnt = vertex.getEdgeCount();

    if (edgeCnt == 0) {
      return;
    } else if (edgeCnt == 1) { // only delete old edge storage, and no need to relink
      let edge = vertex.getEdgeAt(0);
      let edgeIdx = this.findEdgeIdxByID(edge.id);
      this.edgeStorageList.splice(edgeIdx, 1);
      return;
    } else if (edgeCnt == 2) {
      // delete old edge storages
      let prevEdge = vertex.getEdgeAt(0);
      let prevEdgeStorageIdx = this.findEdgeIdxByID(prevEdge.id);
      this.edgeStorageList.splice(prevEdgeStorageIdx, 1);
      let nextEdge = vertex.getEdgeAt(1);
      let nextEdgeStorageIdx = this.findEdgeIdxByID(nextEdge.id);
      this.edgeStorageList.splice(nextEdgeStorageIdx, 1);

      // relink an edge between prev and next vertex
      let prevVertex = prevEdge.source;
      let nextVertex = nextEdge.target;
      try {
        this.graph.getModel().beginUpdate();
        this.insertEdge(prevVertex, nextVertex);
      } finally {
        this.graph.getModel().endUpdate();
      }
    } else {
      throw new Error("from now on, should not be more 2 edges connecting a vertex");
    }
  }
}