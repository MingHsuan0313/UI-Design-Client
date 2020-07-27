import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { BreadcrumbComposite } from "../model";
import { StyleStorage } from "../style-storage.model";
import { DataBinding } from "../util/DataBinding";
import { StyleLibrary } from "../../shared/styleLibrary";
import VertexStorage from "../vertex-storage.model";



export class BreadcrumbStrategy implements ICreateComponentStrategy {
    strategyName: string;
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
        this.strategyName = "Breadcrumb Strategy";
    }

    createDataBinding() {
        let dataBindingName = "";
        let hasDataBining = false;
        let isList = -1;
        let dataBinding = new DataBinding(
          hasDataBining,
          dataBindingName,
          isList
        )
        return dataBinding;
    }

    createBreadcrumbBoxVertex(graphStorage, component, parent) {
      const graphNode = document.getElementById("graphContainer0");
      const defaultWidth = graphNode.offsetWidth;
      const defaultHeight = graphNode.offsetHeight;

        let styleName = "breadCrumbBoxStyle" + component.id;
        const breadcrumbBoxStyle = StyleLibrary[0]["breadcrumb"]["breadcrumbBox"];
        let styleStorage = new StyleStorage(styleName, breadcrumbBoxStyle);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName, breadcrumbBoxStyle);
        const breadcrumbVertexGeometry = new mxGeometry(0, 0, 50, defaultHeight / 30 );
        const breadcrumbVertexStorage = graphStorage.insertVertex(parent, component.id, "", breadcrumbVertexGeometry, styleStorage, component);
        breadcrumbVertexStorage.setIsPrimary(true);
        return breadcrumbVertexStorage;
      }

    createBreadcrumbIndicatorVertex(graphStorage, component, parent, x, y){
        let styleName = "breadCrumbIndicatorStyle";
        const breadcrumbIndicatorStyle = StyleLibrary[0]["breadcrumb"]["breadcrumbIndicator"];
        let styleStorage = new StyleStorage(styleName, breadcrumbIndicatorStyle);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName, breadcrumbIndicatorStyle);
        const breadcrumbVertexGeometry = new mxGeometry(x, y, 15, 5);
        const breadcrumbVertexIndicatorStorage = graphStorage.insertVertex(parent.getVertex(), component.id, "", breadcrumbVertexGeometry, styleStorage, component);
        parent.addChild(breadcrumbVertexIndicatorStorage.id, breadcrumbVertexIndicatorStorage.getVertex(), "indicator");
        return breadcrumbVertexIndicatorStorage;
    }

    createComponent(graphStorage: GraphStorage, component: any, parent: any) {
        let breadcrumbBoxVertexStorage = this.createBreadcrumbBoxVertex(graphStorage, component, parent);

        this.basey = 20;
        this.basex = 30;
        var i = 0;
        for(let subUIComponent of component["componentList"]) {

          let vertexStorage = graphStorage.createComponent(subUIComponent, breadcrumbBoxVertexStorage.getVertex(), this.basex-15, this.basey-15)
          //console.log(vertexStorage)
          breadcrumbBoxVertexStorage.addChild(vertexStorage.id, vertexStorage.getVertex(), "componentList", subUIComponent);
          this.basex = vertexStorage.getVertexX() + vertexStorage.getVertexWidth() + 4;

          if(i != component["componentList"].length-1){
            let indicatorStorage =  this.createBreadcrumbIndicatorVertex(graphStorage, component, breadcrumbBoxVertexStorage, this.basex, this.basey);
            this.basex = indicatorStorage.getVertexX() + indicatorStorage.getVertexWidth()+ 10;
          }
          i += 1;
        }

        let newmxGeometry = new mxGeometry(0, 0, this.basex+30, 40);
        breadcrumbBoxVertexStorage.getVertex().setGeometry(newmxGeometry);
        graphStorage.getGraph().refresh();

        // component["style"] = breadcrumbBoxVertexStorage.getStyle();
        component["x"] = breadcrumbBoxVertexStorage.getVertexX();
        component["y"] = breadcrumbBoxVertexStorage.getVertexY();
        component["width"] = breadcrumbBoxVertexStorage.getVertexWidth();
        component["height"] = breadcrumbBoxVertexStorage.getVertexHeightk();
        return breadcrumbBoxVertexStorage;
    }
}
