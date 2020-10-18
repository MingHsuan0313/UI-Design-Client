import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { GraphStorage , VertexStorage , StyleStorage } from "../../graph-dependency";

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
    this.gridWidth = 150;
    this.gridHeight = 40;
  }

  createDataBinding(part: String, index?) {
    if (part == "box") {
      return new DataBinding(false, part, -1);
    }
    else if (part == "headers") {
      let hasDataBinding = true;
      let dataBindingName = "headers";
      let isList = index;
      let dataBinding = new DataBinding(
        hasDataBinding,
        dataBindingName,
        isList
      );
      return dataBinding;
    }
    else if (part == "rows") {
      let hasDataBinding = true;
      let dataBindingName = "rows";
      let isList = index;
      let dataBinding = new DataBinding(
        hasDataBinding,
        dataBindingName,
        isList
      );
      return dataBinding;
    }
    else 
      return new DataBinding(false, part, -1);
  }

  createTableBoxVertex(graphStorage, component, parent) {
    const headerList = component.headers.trim().split(" ");
    const colNumber = headerList.length;

    let styleName = "tableBoxstyle" + component.id;
    const tableBoxStyle = StyleLibrary[0]["table"]["tableBox"];
    tableBoxStyle["overflow"] = true;
    let styleStorage = new StyleStorage(styleName, tableBoxStyle);
    const width = this.gridWidth * colNumber;
    const height = this.gridHeight * 2;

    const tableBoxVertexGeometry = new mxGeometry(this.basex, this.basey, width, height);
    const tableBoxVertexStorage = graphStorage.insertVertex(parent, component.id, "", tableBoxVertexGeometry, styleStorage, component);
    tableBoxVertexStorage.setIsPrimary(true);
    tableBoxVertexStorage.vertex["componentPart"] = "box";
    tableBoxVertexStorage.vertex["dataBinding"] = this.createDataBinding("box");
    tableBoxVertexStorage.vertex["isPrimary"] = true;
    return tableBoxVertexStorage;
  }

  createTableHeaderVertex(graphStorage, component, parent) {
    const headerList = component.headers.trim().split(" ");
    const colNumber = headerList.length;

    for (let i = 0; i < colNumber; i++) {
      let dataBinding = this.createDataBinding("headers",i);
      const styleName = "tableHeaderstyle" + component.id + ":" + i;
      const tableHeaderStyle = StyleLibrary[0]["table"]["tableHeader"];
      tableHeaderStyle["overflow"] = true;
      const styleStorage = new StyleStorage(styleName, tableHeaderStyle);
      const x = i * this.gridWidth;
      const tableHeaderVertexGeometry = new mxGeometry(x, 0, this.gridWidth, this.gridHeight);
      const tableHeaderVertexStorage = graphStorage.insertVertex(parent.getVertex(), component.id, headerList[i], tableHeaderVertexGeometry, styleStorage, component, dataBinding);
      parent.addChild(tableHeaderVertexStorage.id, tableHeaderVertexStorage.getVertex(), "headers");

      tableHeaderVertexStorage.vertex["componentPart"] = "header";
      tableHeaderVertexStorage.vertex["dataBinding"] = this.createDataBinding("header");
      tableHeaderVertexStorage.vertex["isPrimary"] = false;
    }
  }

  createTableDataVertex(graphStorage, component, parent) {
    const tableDataStyle = StyleLibrary[0]["table"]["tableData_grey"];
    const headerList = component.headers.trim().split(" ");
    const colNumber = headerList.length;
    const rows = component.rows.trim().split(" ");

    tableDataStyle["overflow"] = true;
    for (let i = 0; i < colNumber; i++) {
      let dataBinding = this.createDataBinding("rows",i);
      const styleName = "tableDatastyle" + component.id;
      const styleStorage = new StyleStorage(styleName, tableDataStyle);

      const x = i * this.gridWidth;
      const y = 1 * this.gridHeight;
      const tableDataVertexGeometry = new mxGeometry(x, y, this.gridWidth, this.gridHeight);
      const tableDataVertexStorage = graphStorage.insertVertex(parent.getVertex(),
        component.id, rows[i], tableDataVertexGeometry, styleStorage, component, dataBinding);
      parent.addChild(tableDataVertexStorage.id, tableDataVertexStorage.getVertex(), "rows");
      tableDataVertexStorage.vertex["componentPart"] = "rows";
      tableDataVertexStorage.vertex["dataBinding"] = this.createDataBinding("rows", i);
      tableDataVertexStorage.vertex["isPrimary"] = false;
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
    // component.style = tableBoxVertexStorage.getStyle();

    return tableBoxVertexStorage;
  }

}

