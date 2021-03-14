import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { BreadcrumbComponent } from "../../ui-component-dependency";
import { DataBinding } from "../util/DataBinding";
import { StyleLibrary } from "../../../shared/styleLibrary";
import { SelabEditor } from "../selab-editor.model";
import { SelabVertex } from "../selabVertex.model";
import { TextComponent } from "../../internalRepresentation/TextComponent.model";



// no neet data bindind ,because it consists of text strategy
export class BreadcrumbStrategy extends ICreateComponentStrategy {

  constructor(geometry?, restoreMode?) {
    super(geometry, restoreMode);
  }

  createBreadcrumbBoxVertex(selabEditor: SelabEditor, component: BreadcrumbComponent, parent: mxCell) {
    const graphNode = document.getElementById("graph-container");
    const defaultWidth = graphNode.offsetWidth;
    const defaultHeight = graphNode.offsetHeight;
    const breadcrumbBoxStyle = StyleLibrary[0]["breadcrumb"]["breadcrumbBox"];
    const breadcrumbVertexGeometry = new mxGeometry(this.basex, this.basey, 50, defaultHeight / 30);

    let id = (parseInt(component.id)).toString();
    let selabVertex = new SelabVertex()
      .setID(component.selector + "-" + id)
      .setParentID(parent.id)
      .setIsPrimary(true)
      .setUIComponentID(component.id)

    let breadcrumbBoxCell = selabEditor.insertVertex(selabVertex, component, breadcrumbVertexGeometry, breadcrumbBoxStyle);
    breadcrumbBoxCell["componentPart"] = "box";
    breadcrumbBoxCell["isPrimary"] = true;
    breadcrumbBoxCell["dataBinding"] = this.createDataBinding("box");
    return breadcrumbBoxCell;
  }

  createBreadcrumbIndicatorVertex(selabEditor: SelabEditor, component, parent, x, y, index) {
    const breadcrumbIndicatorStyle = StyleLibrary[0]["breadcrumb"]["breadcrumbIndicator"];
    const breadcrumbVertexGeometry = new mxGeometry(x, y + 10, 20, 20);
    let id = (parseInt(component.id)).toString();

    let selabVertex = new SelabVertex()
      .setID(component.selector + "-" + id)
      .setParentID(parent.id)
      .setIsPrimary(false)
      .setUIComponentID(component.id)
      .setValue(component.text);

    const breadcrumbIndicatorCell = selabEditor.insertVertex(selabVertex, component.id, breadcrumbVertexGeometry, breadcrumbIndicatorStyle);
    breadcrumbIndicatorCell["componentPart"] = "indicator";
    breadcrumbIndicatorCell["isPrimary"] = false;
    breadcrumbIndicatorCell["dataBinding"] = this.createDataBinding("indicator");
    return breadcrumbIndicatorCell;
  }

  createComponent(selabEditor: SelabEditor, component: BreadcrumbComponent, parent: mxCell) {
    console.log('bread crumb strategy here');
    console.log(component);
    let breadcrumbBoxVertex = this.createBreadcrumbBoxVertex(selabEditor, component, parent);

    let p1 = 15;
    let p2 = 15;
    let i = 0;

    for (let subUIComponent of component["componentList"]) {
      let vertexStorage = selabEditor.createComponent(subUIComponent, breadcrumbBoxVertex, p1, p2)
      p1 = vertexStorage.getVertexX() + vertexStorage.getVertexWidth() + 15;

      if (i != component["componentList"].length - 1) {
        let indicatorStorage = this.createBreadcrumbIndicatorVertex(selabEditor, component, breadcrumbBoxVertex, p1, p2, i);
        p1 = indicatorStorage.geometry.x + indicatorStorage.geometry.width + 15;
      }
      i += 1;
    }

    let newmxGeometry = new mxGeometry(this.basex, this.basey, p1 + 30, 50);
    breadcrumbBoxVertex.setGeometry(newmxGeometry);
    selabEditor.getGraph().refresh();
    return breadcrumbBoxVertex;
  }

  createDataBinding(part: String, index?){
    return new DataBinding(false, "", -1);
  }
}