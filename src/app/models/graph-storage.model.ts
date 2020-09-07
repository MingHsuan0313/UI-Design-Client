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
import { StyleLibrary } from '../shared/styleLibrary';

export class GraphStorage {
  vertexStorageList: VertexStorage[];
  edgeStorageList: EdgeStorage[];
  editor: mxEditor;
  graphModel: mxGraphModel;
  graph: mxGraph;
  id: string;
  strategy: ICreateComponentStrategy;
  // true if modified and haven't been saved yet
  modified: Boolean;

  // create graph
  constructor(element, id) {
    this.modified = false;
    this.vertexStorageList = [];
    this.edgeStorageList = [];
    this.id = id;
    this.editor = new mxEditor();
    this.graph = this.editor.graph;
    // this.graphModel = new mxGraphModel();
    this.editor.setGraphContainer(element);
    // this.graph = new mxGraph(element, this.graphModel);
    // mxConnectionHandler.prototype.connectImage = new mxImage('src/app/resources/images/arrow.svg', 14, 14);
    this.graph.setConnectable(true);
    this.graphModel = this.graph.getModel();
    let config = mxUtils.load("assets/keyhandler.xml").getDocumentElement();
    console.log("Heree")
    console.log(config)
    this.editor.configure(config);
    console.log("create editor")
    console.log(this.editor)
    console.log(new mxImage('src/app/resources/images/arrow.gif', 14, 14));
    // this.editor.addAction("dd",(editor,cell) => {
    //   console.log("Hello")
    // })

    // const keyHandler = new mxKeyHandler(this.graph);
    // keyHandler.bindKey(46, function (evt) {
    //   console.log('inside keyhandler');
    //   this.editor.execute("dd")
    // });

    // keyHandler.bindKey(89, function (evt) {
    //   console.log('undo');
    //   console.log(evt)
    // });


    let style = {};
    let cell;
    let count = 0;

    // this.graph.addListener(mxEvent.DOUBLE_CLICK, function (sender, evt) {
    //   console.log(sender);
    //   console.log(evt);
    //   console.log("doule click");
    //   cell = evt.getProperty('cell');
    //   count++;
    //   // To prevent double click for inputting text
    //   if (count % 2 == 1) {
    //     return;
    //   }

    //   // mxUtils.alert('Doubleclick: '+((cell != null) ? 'Cell' : 'Graph'));
    //   let styleName = cell['style'];
    //   style = this.getStylesheet().getCellStyle(styleName);
    //   style['fontSize'] = StyleLibrary[0]['fontSize'];
    //   this.getStylesheet().putCellStyle(styleName, style);
    //   this.refresh();
    //   evt.consume();
    // });
    this.graph.addListener(mxEvent.RESIZE_CELLS,(sender, event) => {
      console.log("vertex is resized");
      this.modified = true;
    })

    this.graph.addListener(mxEvent.MOVE_CELLS,(sender,event) => {
      this.modified = true;
    })


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
      // let style = this.graph.getStylesheet().getCellStyle(vertexStorage.styleStorage.name);
      // vertexStorage.styleStorage.setStyle(style);
      vertexStorage.sync();
    }

    // reset navigation flow then sync
    Storage.navigationFlow = null;
    Storage.navigationList = [];
    for (const edgeStorage of this.edgeStorageList) {
      edgeStorage.sync();
    }
    this.modified = false;
  }

  setModified() {
    this.modified = true;
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
        // default:
        //   parent = this.findVertexByID(1); // body
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
      // basey = basey + 20;
      // let maxWidth = 0;
      // for(let subUIComponent of component["componentList"]) {
      //   let vertexStorage = this.createComponent(subUIComponent, compositeVertexStorage.getVertex(),basex,basey)
      //   if(vertexStorage.getVertexWidth() > maxWidth)
      //     maxWidth = vertexStorage.getVertexWidth();
      //   basey = basey + vertexStorage.getVertexHeight();
      //   compositeVertexStorage.addChild(vertexStorage.id, vertexStorage.getVertex(), "componentList",subUIComponent);
      // }

      // let newmxGeometry = new mxGeometry(0,0,maxWidth,basey);
      // compositeVertexStorage.setGeometry(newmxGeometry);
      // this.getGraph().refresh();
      return compositeVertexStorage;
    }

  }

  getGraph() {
    return this.graph;
  }

  getGraphModel() {
    return this.graphModel;
  }

  // insert vertex
  insertVertex(parent, vertexID, vertexValue, geometry, styleStorage, uicomponent, dataBinding?, isPrimary?) {
    this.modified = true;
    let vertex;
    let style = styleStorage.style;
    // eg : fillColor=red;strokeColor=blue
    let styleDescription = "";
    let styleKeys = Object.keys(style);
    for (let index = 0; index < styleKeys.length; index++) {
      let key = styleKeys[index];
      if (index == styleKeys.length - 1)
        styleDescription = styleDescription + `${key}=${style[key]};`
      else
        styleDescription = styleDescription + `${key}=${style[key]};`
    }

    try {
      this.graph.getModel().beginUpdate();
      vertex = this.graph.insertVertex(parent, vertexID, vertexValue, geometry.x, geometry.y, geometry.width, geometry.height,styleDescription, '');
      // vertex = this.graph.insertVertex(parent, vertexID, vertexValue, geometry.x, geometry.y, geometry.width, geometry.height,"rounded=true", '');
    } finally {
      this.graph.getModel().endUpdate();
      // new mxHierarchicalLayout(this.graph).execute(this.graph.getDefaultParent());
    }
    let cloneStyle = {};
    Object.assign(cloneStyle,styleStorage.style);
    styleStorage.style = cloneStyle;
    const vertexStorage = new VertexStorage(vertex,styleStorage, uicomponent, dataBinding, isPrimary);
    this.vertexStorageList.push(vertexStorage);
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
    for (const element of this.vertexStorageList) {
      if (element.id == id) {
        return element.getVertex();
      }
    }
  }

  findVertexStorageByID(id) {
    for (const element of this.vertexStorageList) {
      if (element.id == id) {
        return element;
      }
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

  getMaxID(){
    let cellsObject = this.getGraphModel().cells;
    const cells = Object.values(cellsObject);
    console.log(cells);
    let maxID = cells.reduce((acc:number, cur:mxCell)=>{
      return Math.max(acc, parseInt(cur.id));
    }, 0);
    return maxID;
  }




  getModified() {
    return this.modified;
  }
}
