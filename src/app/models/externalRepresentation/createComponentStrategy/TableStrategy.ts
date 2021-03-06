import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { DataBinding } from "../util/DataBinding";
import { SelabEditor } from "../selab-editor.model";
import { TableComponent } from "../../internalRepresentation/TableComponent.model";
import { SelabVertex } from "../selabVertex.model";

export class TableStrategy extends ICreateComponentStrategy {

  gridWidth: number;
  gridHeight: number;

  constructor(geometry?, restoreMode?) {
    super(geometry, restoreMode);
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

  createTableBoxVertex(selabEditor: SelabEditor, component: TableComponent, parent: mxCell): mxCell {
    const headerList = component.headers.trim().split(" ");
    const colNumber = headerList.length;

    const tableBoxStyle = StyleLibrary[0]["table"]["tableBox"];
    tableBoxStyle["overflow"] = true;
    const width = this.gridWidth * colNumber;
    const height = this.gridHeight * 2;

    let id = (parseInt(component.id)).toString();
    let selabVertex = new SelabVertex()
      .setID(component.selector + "-" + id)
      .setUIComponentID(component.id)
      .setParentID(parent.id)
      .setIsPrimary(true);

    const tableBoxVertexGeometry = new mxGeometry(this.basex, this.basey, width, height);
    let tableBoxCell = selabEditor.insertVertex(selabVertex, component, tableBoxVertexGeometry, tableBoxStyle);

    tableBoxCell["componentPart"] = "box";
    tableBoxCell["dataBinding"] = this.createDataBinding("box");
    tableBoxCell["isPrimary"] = true;
    tableBoxCell["componentID"] = component.id;
    return tableBoxCell;
  }

  createTableHeaderVertex(selabEditor: SelabEditor, component: TableComponent, parent: mxCell) {
    const headerList = component.headers.trim().split(" ");
    const colNumber = headerList.length;

    for (let i = 0; i < colNumber; i++) {
      let dataBinding = this.createDataBinding("headers", i);
      const tableHeaderStyle = StyleLibrary[0]["table"]["tableHeader"];
      tableHeaderStyle["overflow"] = true;
      const x = i * this.gridWidth;
      let id = (parseInt(component.id) + 1 + i).toString();
      let selabVertex = new SelabVertex()
        .setID(component.selector + '-' + id)
        .setUIComponentID(component.id)
        .setIsPrimary(false)
        .setDataBinding(dataBinding)
        .setParentID(parent.id)
        .setValue(component['headers'].split(" ")[i]);

      const tableHeaderVertexGeometry = new mxGeometry(x, 0, this.gridWidth, this.gridHeight);
      let tableHeaderCell = selabEditor.insertVertex(selabVertex, component, tableHeaderVertexGeometry, tableHeaderStyle);
      tableHeaderCell["componentPart"] = "header";
      tableHeaderCell["dataBinding"] = this.createDataBinding("header");
      tableHeaderCell["isPrimary"] = false;
      tableHeaderCell["componentID"] = component.id;
    }
  }

  createTableDataVertex(selabEditor: SelabEditor, component: TableComponent, parent: mxCell) {
    const tableDataStyle = StyleLibrary[0]["table"]["tableData_grey"];
    const headerList = component.headers.trim().split(" ");
    const colNumber = headerList.length;
    const rows = component.rows.trim().split(" ");
    tableDataStyle["overflow"] = true;

    for (let i = 0; i < colNumber; i++) {
      let dataBinding = this.createDataBinding("rows", i);
      const x = i * this.gridWidth;
      const y = 1 * this.gridHeight;
      const tableDataVertexGeometry = new mxGeometry(x, y, this.gridWidth, this.gridHeight);
      let id = (parseInt(component.id) + colNumber + 1 + i).toString();
      let selabVertex = new SelabVertex()
        .setID(component.selector + "-" + id)
        .setUIComponentID(component.id)
        .setIsPrimary(false)
        .setParentID(parent.id)
        .setDataBinding(dataBinding)
        .setValue(component['rows'].split(" ")[i])

      let tableDataCell = selabEditor.insertVertex(selabVertex, component, tableDataVertexGeometry, tableDataStyle);
      tableDataCell["componentPart"] = "rows";
      tableDataCell["dataBinding"] = this.createDataBinding("rows", i);
      tableDataCell["isPrimary"] = false;
      tableDataCell["componentID"] = component.id;
    }
  }

  createComponent(selabEditor: SelabEditor, component: TableComponent, parent: mxCell) {
    mxConstants.SHADOW_OPACITY = 0.3;
    let tableBoxVertexStorage = this.createTableBoxVertex(selabEditor, component, parent);
    this.createTableHeaderVertex(selabEditor, component, tableBoxVertexStorage);
    this.createTableDataVertex(selabEditor, component, tableBoxVertexStorage);
    return tableBoxVertexStorage;
  }
}

