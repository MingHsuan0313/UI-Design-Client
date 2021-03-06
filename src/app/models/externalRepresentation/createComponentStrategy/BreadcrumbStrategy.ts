import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { BreadcrumbComponent } from "../../ui-component-dependency";
import { DataBinding } from "../util/DataBinding";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { GraphStorage , VertexStorage , StyleStorage } from "../../graph-dependency";



// no neet data bindind ,because it consists of text strategy
export class BreadcrumbStrategy extends ICreateComponentStrategy {

  constructor(geometry?, restoreMode?) {
    super(geometry, restoreMode);
  }


  createBreadcrumbBoxVertex(graphStorage, component, parent) {
    const graphNode = document.getElementById("graphContainer0");
    const defaultWidth = graphNode.offsetWidth;
    const defaultHeight = graphNode.offsetHeight;

    let styleName = "breadCrumbBoxStyle" + component.id;
    const breadcrumbBoxStyle = StyleLibrary[0]["breadcrumb"]["breadcrumbBox"];
    let styleStorage = new StyleStorage(styleName, breadcrumbBoxStyle);
    const breadcrumbVertexGeometry = new mxGeometry(this.basex, this.basey, 50, defaultHeight / 30);
    const breadcrumbVertexStorage = graphStorage.insertVertex(parent, component.id, "", breadcrumbVertexGeometry, styleStorage, component);
    breadcrumbVertexStorage.setIsPrimary(true);
    // add Info to mxcell
    breadcrumbVertexStorage.vertex["componentPart"] = "box";
    breadcrumbVertexStorage.vertex["isPrimary"] = true;
    breadcrumbVertexStorage.vertex["dataBinding"] = this.createDataBinding("box");

    return breadcrumbVertexStorage;
  }

  createBreadcrumbIndicatorVertex(graphStorage:GraphStorage, component, parent, x, y, index) {
    let styleName = "breadCrumbIndicatorStyle";
    const breadcrumbIndicatorStyle = StyleLibrary[0]["breadcrumb"]["breadcrumbIndicator"];
    let styleStorage = new StyleStorage(styleName, breadcrumbIndicatorStyle);
    const breadcrumbVertexGeometry = new mxGeometry(x, y + 10, 20, 20);
    const breadcrumbVertexIndicatorStorage = graphStorage.insertVertex(parent.getVertex(), component.id, "", breadcrumbVertexGeometry, styleStorage, component);
    parent.addChild(breadcrumbVertexIndicatorStorage.id, breadcrumbVertexIndicatorStorage.getVertex(), "indicator");
    
    breadcrumbVertexIndicatorStorage.vertex["componentPart"] = "indicator";
    breadcrumbVertexIndicatorStorage.vertex["isPrimary"] = false;
    breadcrumbVertexIndicatorStorage.setIsPrimary(true);
    breadcrumbVertexIndicatorStorage.vertex["dataBinding"] = this.createDataBinding("indicator");
    
    return breadcrumbVertexIndicatorStorage;
  }

  createComponent(graphStorage: GraphStorage, component: any, parent: any) {
    let breadcrumbBoxVertexStorage = this.createBreadcrumbBoxVertex(graphStorage, component, parent);

    let p1 = 15;
    let p2 = 15;
    var i = 0;
    for (let subUIComponent of component["componentList"]) {

      let vertexStorage = graphStorage.createComponent(subUIComponent, breadcrumbBoxVertexStorage.getVertex(), p1, p2)
      //console.log(vertexStorage)
      breadcrumbBoxVertexStorage.addChild(vertexStorage.id, vertexStorage.getVertex(), "componentList", subUIComponent);
      p1 = vertexStorage.getVertexX() + vertexStorage.getVertexWidth() + 15;

      if (i != component["componentList"].length - 1) {
        let indicatorStorage = this.createBreadcrumbIndicatorVertex(graphStorage, component, breadcrumbBoxVertexStorage, p1, p2, i);
        p1 = indicatorStorage.getVertexX() + indicatorStorage.getVertexWidth() + 15;
      }
      i += 1;

    }

    let newmxGeometry = new mxGeometry(this.basex, this.basey, p1 + 30, 50);
    breadcrumbBoxVertexStorage.getVertex().setGeometry(newmxGeometry);
    graphStorage.getGraph().refresh();
    return breadcrumbBoxVertexStorage;
  }

  createDataBinding(part: String, index?){
    return new DataBinding(false, "", -1);
  }
}
