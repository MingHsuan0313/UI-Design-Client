import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { StyleLibrary } from "../../shared/styleLibrary";
import { StyleStorage } from "../style-storage.model";
import { DataBinding } from "../util/DataBinding";

export class TableStrategy implements ICreateComponentStrategy {
  basex: number;
  basey: number;
  gridWidth: number;
  gridHeight: number;

  constructor(basex?, basey?) {
    // basic component
    if (basex == undefined || basey == undefined) {
      this.basex = 0;
      this.basey = 0;
    } else {
      this.basex = basex;
      this.basey = basey;
    }
    this.gridWidth = 100;
    this.gridHeight = 50;
  }

  createDataBinding(index, key) {
    let hasDataBinding = true;
    let dataBindingName = key;
    let isList = index;
    let dataBinding = new DataBinding(
      hasDataBinding,
      dataBindingName,
      isList
    );
    return dataBinding;
  }

  createTableBoxVertex(graphStorage, component, parent) {
    const headerList = component.headers.trim().split(" ");
    const colNumber = headerList.length;

    let styleName = "tableBoxstyle" + component.id;
    const tableBoxStyle = StyleLibrary[0]["table"]["tableBox"];
    tableBoxStyle["overflow"] = true;
    let styleStorage = new StyleStorage(styleName, tableBoxStyle);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, tableBoxStyle);
    const width = this.gridWidth * colNumber;
    const height = this.gridHeight * 2;

    const tableBoxVertexGeometry = new mxGeometry(this.basex, this.basey, width, height);
    const tableBoxVertexStorage = graphStorage.insertVertex(parent, component.id, "", tableBoxVertexGeometry, styleStorage, component)

    return tableBoxVertexStorage;
  }

  createTableHeaderVertex(graphStorage, component, parent) {
    const headerList = component.headers.trim().split(" ");
    const colNumber = headerList.length;

    for (let i = 0; i < colNumber; i++) {
      let dataBinding = this.createDataBinding(i,"headers");
      const styleName = "tableHeaderstyle" + component.id + ":" + i;
      const tableHeaderStyle = StyleLibrary[0]["table"]["tableHeader"];
      tableHeaderStyle["overflow"] = true;
      const styleStorage = new StyleStorage(styleName, tableHeaderStyle);
      graphStorage.getGraph().getStylesheet().putCellStyle(styleName, tableHeaderStyle);
      const x = i * this.gridWidth;
      const tableHeaderVertexGeometry = new mxGeometry(this.basex + x, this.basey + 0, this.gridWidth, this.gridHeight);
      const tableHeaderVertexStorage = graphStorage.insertVertex(parent.getVertex(), component.id, headerList[i], tableHeaderVertexGeometry, styleStorage, component, dataBinding);
      parent.addChild(tableHeaderVertexStorage.id, tableHeaderVertexStorage.getVertex(), "headers");
    }
  }

  createTableDataVertex(graphStorage, component, parent) {
    const tableDataStyle = StyleLibrary[0]["table"]["tableData_grey"];
    const headerList = component.headers.trim().split(" ");
    const colNumber = headerList.length;
    const rows = component.rows.trim().split(" ");

    tableDataStyle["overflow"] = true;
    for (let i = 0; i < colNumber; i++) {
      let dataBinding = this.createDataBinding(i,"rows");
      const styleName = "tableDatastyle" + component.id;
      const styleStorage = new StyleStorage(styleName, tableDataStyle);
      graphStorage.getGraph().getStylesheet().putCellStyle(styleName, tableDataStyle);

      const x = i * this.gridWidth;
      const y = 1 * this.gridHeight;
      const tableDataVertexGeometry = new mxGeometry(this.basex + x, this.basey + y, this.gridWidth, this.gridHeight);
      const tableDataVertexStorage = graphStorage.insertVertex(parent.getVertex(),
        component.id, rows[i], tableDataVertexGeometry, styleStorage, component,dataBinding);
      parent.addChild(tableDataVertexStorage.id, tableDataVertexStorage.getVertex(), "rows");
    }
  }

  createComponent(graphStorage: GraphStorage, component, parent) {
    mxConstants.SHADOW_OPACITY = 0.3;

    let tableBoxVertexStorage = this.createTableBoxVertex(graphStorage, component, parent);
    this.createTableHeaderVertex(graphStorage, component, tableBoxVertexStorage);
    this.createTableDataVertex(graphStorage, component, tableBoxVertexStorage);

    component.x = tableBoxVertexStorage.getVertexX();
    component.y = tableBoxVertexStorage.getVertexY();
    component.width = tableBoxVertexStorage.getVertexWidth();
    component.height = tableBoxVertexStorage.getVertexHeight();
    component.style = tableBoxVertexStorage.getStyle();

    return tableBoxVertexStorage;
  }

}

