import VertexStorage from "./vertex-storage.model";
import EdgeStorage from "./edge-storage.model";
import {Storage} from "./../shared/storage";
import {ICreateComponentStrategy} from "./createComponentStrategy/ICreateComponentStrategy";
import {ButtonStrategy} from "./createComponentStrategy/ButtonStrategy";
import {TextStrategy} from "./createComponentStrategy/TextStrategy";
import {DropdownStrategy} from "./createComponentStrategy/DropdownStrategy";
import {TableStrategy} from "./createComponentStrategy/TableStrategy";

import {CardStrategy} from "./createComponentStrategy/CardStrategy";
import {IconStrategy} from "./createComponentStrategy/IconStrategy";
import {InputStrategy} from "./createComponentStrategy/InputStrategy";
import {LayoutStrategy} from "./createComponentStrategy/LayoutStrategy";

export class GraphStorage {
  vertexStorageList: VertexStorage[];
  edgeStorageList: EdgeStorage[];
  graphModel: mxGraphModel;
  graph: mxGraph;
  id: string;
  strategy: ICreateComponentStrategy;

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
    );
  }

  // sync internal storage and external storage
  syncStorage() {
    for (const vertexStorage of this.vertexStorageList) {
      vertexStorage.sync();
    }
  }

  setStrategy(strategy: ICreateComponentStrategy) {
    this.strategy = strategy;
  }

  createComponent(component, parent, basex?, basey?) {
    console.log("create Component heree");
    console.log(component);
    if (basex == undefined || basey == undefined) {
      basex = 30;
      basey = 30;
    } else if (component["type"].startsWith("Layout")) {
      basex = 0;
      basey = 0;
    }

    // basic component
    if (component["componentList"] == undefined) {
      if (component["type"] == "button") {
        this.setStrategy(new ButtonStrategy(basex, basey));
      } else if (component["type"] == "text") {
        this.setStrategy(new TextStrategy(basex, basey));
      } else if (component["type"] == "dropdown") {
        this.setStrategy(new DropdownStrategy(basex, basey));
      } else if (component["type"] == "table") {
        this.setStrategy(new TableStrategy(basex, basey));
      } else if (component["type"] == "icon") {
        this.setStrategy(new IconStrategy(basex, basey));
      } else if (component["type"].startsWith("input")) {
        this.setStrategy(new InputStrategy(basex, basey));
      } else if (component["type"].startsWith("Layout")) {
        this.setStrategy(new LayoutStrategy(basex, basey));

      }

      return this.strategy.createComponent(this, component, parent);
    } else {

      if (component["type"] == "card") {
        this.setStrategy(new CardStrategy(basex, basey));
      }

      const compositeVertexStorage = this.strategy.createComponent(this, component, parent);
      basey = basey + 20;
      let maxWidth = 0;
      for (const subUIComponent of component["componentList"]) {
        const vertexStorage = this.createComponent(subUIComponent, compositeVertexStorage.getVertex(), basex, basey);
        if (vertexStorage.getVertexWidth() > maxWidth) {
          maxWidth = vertexStorage.getVertexWidth();
        }
        basey = basey + vertexStorage.getVertexHeight();
        compositeVertexStorage.addChild(vertexStorage.id, vertexStorage.getVertex(), "componentList", subUIComponent);
      }

      const newmxGeometry = new mxGeometry(0, 0, maxWidth, basey);
      compositeVertexStorage.setGeometry(newmxGeometry);
      this.getGraph().refresh();
      return compositeVertexStorage;
    }

  }

  getGraph() {
    return this.graph;
  }

  // insert vertex
  insertVertex(parent, vertexID, vertexValue, geometry, styleStorage, uicomponent, dataBinding?, isPrimary?) {
    let vertex;
    try {
      this.graph.getModel().beginUpdate();
      vertex = this.graph.insertVertex(parent, vertexID, vertexValue, geometry.x, geometry.y, geometry.width, geometry.height, styleStorage.name, "");
    } finally {
      this.graph.getModel().endUpdate();
      // new mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
    }

    const vertexStorage = new VertexStorage(vertex, styleStorage, uicomponent, dataBinding, isPrimary);
    this.vertexStorageList.push(vertexStorage);
    return vertexStorage;
  }

  insertEdge(sourceVertex, targetVertex) {
    let edge;

    try {
      const parent = this.graph.getDefaultParent();
      this.graph.getModel().beginUpdate();
      edge = this.graph.insertEdge(parent, "", "", sourceVertex, targetVertex, "");

    } finally {
      this.graph.getModel().endUpdate();
    }
    const edgeModel = new EdgeStorage(edge);
    this.edgeStorageList.push(edgeModel);
    return edge;
  }

  findVertexByID(id) {
    for (const element of this.vertexStorageList) {
      if (element.id == id) {
        return element;
      }
    }
  }

  getID() {
    return this.id;
  }

}
