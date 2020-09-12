import VertexStorage from './vertex-storage.model';
import EdgeStorage from './edge-storage.model';
import { Storage } from './../shared/storage';
import { ICreateComponentStrategy } from './createComponentStrategy/ICreateComponentStrategy';
import { ButtonStrategy } from './createComponentStrategy/ButtonStrategy';
import { TextStrategy } from './createComponentStrategy/TextStrategy';
import { DropdownStrategy } from './createComponentStrategy/DropdownStrategy';
import { TableStrategy } from './createComponentStrategy/TableStrategy';
import { FormStrategy } from './createComponentStrategy/FormStrategy';
import { CardStrategy } from './createComponentStrategy/CardStrategy';
import { BreadcrumbStrategy } from './createComponentStrategy/BreadcrumbStrategy';
import { IconStrategy } from './createComponentStrategy/IconStrategy';
import { InputStrategy } from './createComponentStrategy/InputStrategy';
import { LayoutStrategy } from './createComponentStrategy/LayoutStrategy';
import { GraphConfiguration } from './util/graph-configuration';
import { PropertyGenerator } from '../shared/property-generator';

export class GraphStorage {
  vertexStorageList: {}; //{index:VertexStorage}
  garbageStorageList: {}; // vertexStorages for recover;
  edgeStorageList: EdgeStorage[];
  editor: mxEditor;
  graphModel: mxGraphModel;
  graph: mxGraph;
  id: string;
  graphConfiguration: GraphConfiguration;



  strategy: ICreateComponentStrategy;
  // true if modified and haven't been saved yet
  modified: Boolean;

  // create graph
  constructor(element, id) {
    this.modified = false;
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

  // sync internal storage and external storage
  syncStorage() {

    for (let key in this.vertexStorageList) {
      this.vertexStorageList[key].sync();
    }

    // reset navigation flow then sync
    Storage.navigationFlow = null;
    Storage.navigationList = [];
    for (const edgeStorage of this.edgeStorageList) {
      edgeStorage.sync();
    }
    this.setUnModified();
  }

  // after copy delete undo redo
  // we need to create or destroy vertexStorage as well
  syncMxCells() {
    let mxCells = this.getGraphModel().cells;

    // for copy & recover cell
    for (let key in mxCells) {
      console.log(key);
      if (!(key in this.vertexStorageList)) {
        console.log(`key : + ${key} not in vertexStorage`)
        this.createVertexStorageByCell(mxCells[key], key);
      }
    }

    // for delete
    for (let key in this.vertexStorageList) {
      console.log(key);
      if (!(key in mxCells)) {
        console.log(`key : + ${key} not in vertexStorage`)
        this.deleteVertexStorageByIndex(key);
      }
    }

    console.log("cells here");
    console.log(mxCells);
    console.log(this.vertexStorageList);
  }

  createVertexStorageByCell(sourceCells,targetCells) {

  }

  deleteVertexStorageByIndex(index) {
    this.garbageStorageList[index] = this.vertexStorageList[index];
    delete this.vertexStorageList[index];
  }

  setStrategy(strategy: ICreateComponentStrategy) {
    this.strategy = strategy;
  }

  createComponent(component, parent, basex?, basey?) {
    const graphNode = document.getElementById('graphContainer0');
    const defaultWidth = graphNode.offsetWidth;
    const defaultHeight = graphNode.offsetHeight;

    if (component['type'].startsWith('layout')) {
      basex = 0;
      basey = 0;

    } else if (basex == undefined || basey == undefined) {
      basex = defaultWidth * 3 / 10;
      basey = defaultHeight * 3 / 10;
    }

    // set parent [layout parts] to each components
    if (parent.id < 8) {
      switch (component['layout']) {
        case 'header':
          parent = this.findVertexByID(3);
          basex = parent['x'];
          basey = parent['y'];
          break;
        case 'footer':
          parent = this.findVertexByID(4);
          basex = parent['x'];
          basey = parent['y'];
          break;
        case 'sidebar':
          parent = this.findVertexByID(5);
          basex = parent['x'];
          basey = parent['y'];
          break;
        case 'asidebar':
          parent = this.findVertexByID(7);
          basex = parent['x'];
          basey = parent['y'];
          break;
      }
    }

    // basic component
    if (component['componentList'] == undefined) {
      if (component['type'] == 'button') {
        this.setStrategy(new ButtonStrategy(basex, basey));
      } else if (component['type'] == 'text') {
        this.setStrategy(new TextStrategy(basex, basey));
      } else if (component['type'] == 'dropdown') {
        this.setStrategy(new DropdownStrategy(basex, basey));
      } else if (component['type'] == 'table') {
        this.setStrategy(new TableStrategy(basex, basey));
      } else if (component['type'] == 'icon') {
        this.setStrategy(new IconStrategy(basex, basey));
      } else if (component['type'].startsWith('input')) {
        this.setStrategy(new InputStrategy(basex, basey));
      }

      return this.strategy.createComponent(this, component, parent);
    } else {

      if (component['type'] == 'card') {
        this.setStrategy(new CardStrategy(basex, basey));
      } else if (component['type'] == 'breadcrumb') {
        this.setStrategy(new BreadcrumbStrategy(basex, basey));
      } else if (component['type'] == 'form') {
        this.setStrategy(new FormStrategy(basex, basey));
      } else if (component['type'].startsWith('layout')) {
        // initialized layout into 5 parts
        this.setStrategy(new LayoutStrategy(basex, basey));

      }

      const compositeVertexStorage = this.strategy.createComponent(this, component, parent);
      return compositeVertexStorage;
    }
  }

  getGraph() {
    return this.graph;
  }

  getGraphModel() {
    return this.graphModel;
  }

  convertJsonObjectToStyleDescription(styleObj) {
    // eg : fillColor=red;strokeColor=blue
    let styleDescription = "";
    let styleKeys = Object.keys(styleObj);
    for (let index = 0; index < styleKeys.length; index++) {
      let key = styleKeys[index];
      if (index == styleKeys.length - 1)
        styleDescription = styleDescription + `${key}=${styleObj[key]};`
      else
        styleDescription = styleDescription + `${key}=${styleObj[key]};`
    }
    return styleDescription;
  }

  // insert vertex
  insertVertex(parent, vertexID, vertexValue, geometry, styleStorage, uicomponent, dataBinding?, isPrimary?) {
    this.modified = true;
    let vertex;

    let styleDescription = this.convertJsonObjectToStyleDescription(styleStorage.style);
    try {
      this.graph.getModel().beginUpdate();
      vertex = this.graph.insertVertex(parent, vertexID, vertexValue, geometry.x, geometry.y, geometry.width, geometry.height, styleDescription, '');
      vertex["selector"] = uicomponent["selector"]
      vertex["type"] = uicomponent["type"]
      // vertex = this.graph.insertVertex(parent, vertexID, vertexValue, geometry.x, geometry.y, geometry.width, geometry.height,"rounded=true", '');
    } finally {
      this.graph.getModel().endUpdate();
      // new mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
    }
    let cloneStyle = {};
    Object.assign(cloneStyle, styleStorage.style);
    styleStorage.style = cloneStyle;
    const vertexStorage = new VertexStorage(vertex, styleStorage, uicomponent, dataBinding, isPrimary);
    let vertexLength = Object.keys(this.vertexStorageList).length;
    this.vertexStorageList[vertexLength] = vertexStorage;
    return vertexStorage;
  }

  insertEdge(sourceVertex, targetVertex) {
    this.modified = true;
    let edge;

    try {
      const parent = this.graph.getDefaultParent();
      let style = new Object();
      style[mxConstants.STYLE_FONTSIZE] = 16;
      this.graph.getStylesheet().putCellStyle('edgeStyle', style);
      this.graph.getModel().beginUpdate();
      edge = this.graph.insertEdge(parent, '', '', sourceVertex, targetVertex, 'edgeStyle');

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
      return Math.max(acc, parseInt(cur.id));
    }, 0);
    return maxID;
  }

  getModified() {
    return this.editor.modified;
  }


  setModified() {
    console.log("set modified")
    this.editor.setModified(true);
  }

  setUnModified() {
    this.editor.setModified(false);
  }

  // copy children as well
  delete(vertexIDs) {

  }

  // copy children as well
  copy(vertexIDs) {

  }
}
