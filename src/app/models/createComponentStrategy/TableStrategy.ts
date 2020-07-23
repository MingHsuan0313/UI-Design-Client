import {ICreateComponentStrategy} from "./ICreateComponentStrategy";
import {GraphStorage} from "../graph-storage.model";
import {StyleLibrary} from "../../shared/styleLibrary";
import {StyleStorage} from "../style-storage.model";

export class TableStrategy implements ICreateComponentStrategy {
  basex: number;
  basey: number;

  constructor(basex?, basey?) {
    // basic component
    if (basex == undefined || basey == undefined) {
      this.basex = 0;
      this.basey = 0;
    } else {
      this.basex = basex;
      this.basey = basey;
    }
  }

  createComponent(graphStorage: GraphStorage, component, parent) {
    const heightValue = 50;
    const widthValue = 100;
    const headerList = component.headers.trim().split(" ");
    const colNumber = headerList.length;
    const rows = component.rows.trim().split(" ");

    mxConstants.SHADOW_OPACITY = 0.3;

    // set style
    let styleName = "tableBoxstyle" + component.id;
    const tableBoxStyle = StyleLibrary[0]["tableBox"];
    tableBoxStyle["overflow"] = true;
    let styleStorage = new StyleStorage(styleName, tableBoxStyle);
    graphStorage.getGraph().getStylesheet().putCellStyle(styleName, tableBoxStyle);
    const width = widthValue * colNumber;
    const height = heightValue * 2;

    const tableBoxVertexGeometry = new mxGeometry(this.basex, this.basey, width, height);
    const tableBoxVertexStorage = graphStorage.insertVertex(parent, component.id, "", tableBoxVertexGeometry, styleStorage, component);
    component.width = width;
    component.height = height;

    let tableHeaderVertexGeometry;
    for (let i = 0; i < colNumber; i++) {
      styleName = "tableHeaderstyle" + component.id + ":" + i;
      const tableHeaderStyle = StyleLibrary[0]["tableHeader"];
      tableHeaderStyle["overflow"] = true;
      styleStorage = new StyleStorage(styleName, tableHeaderStyle);
      graphStorage.getGraph().getStylesheet().putCellStyle(styleName, tableHeaderStyle);
      const x = i * widthValue;
      tableHeaderVertexGeometry = new mxGeometry(this.basex + x, this.basey + 0, widthValue, heightValue);
      const tableHeaderVertexStorage = graphStorage.insertVertex(tableBoxVertexStorage.getVertex(), component.id, headerList[i], tableHeaderVertexGeometry, styleStorage, component);
      tableBoxVertexStorage.addChild(tableHeaderVertexStorage.id, tableHeaderVertexStorage.getVertex(), "headers");
    }


    let tableDataVertexGeometry;
    let tableDataStyle;

    tableDataStyle = StyleLibrary[0]["tableData_grey"];

    // tableDataStyle = StyleLibrary[0]['tableData_white'];

    tableDataStyle["overflow"] = true;
    for (let i = 0; i < colNumber; i++) {
      styleName = "tableDatastyle" + component.id;
      styleStorage = new StyleStorage(styleName, tableDataStyle);
      graphStorage.getGraph().getStylesheet().putCellStyle(styleName, tableDataStyle);

      const x = i * widthValue;
      const y = 1 * heightValue;
      tableDataVertexGeometry = new mxGeometry(this.basex + x, this.basey + y, widthValue, heightValue);
      const tableDataVertexStorage = graphStorage.insertVertex(tableBoxVertexStorage.getVertex(),
        component.id, rows[i], tableDataVertexGeometry, styleStorage, component);
      tableBoxVertexStorage.addChild(tableDataVertexStorage.id, tableDataVertexStorage.getVertex(), "rows");
    }
  }

}

