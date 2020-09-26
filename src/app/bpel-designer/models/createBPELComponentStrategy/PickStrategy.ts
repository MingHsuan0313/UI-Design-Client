import { GraphStorage, StyleStorage } from "src/app/models/modelDependency";
import { BPELComponent } from "../components/component/BPELComponent.model";
import { ICreateBPELComponentStrategy } from "./ICreateBPELComponentStrategy";

export class PickStrategy implements ICreateBPELComponentStrategy {
    strategyName: string = "<pick> strategy";
    basex: number;
    basey: number;

    constructor(basex?: number, basey?: number) {
      if (basex == undefined || basey == undefined) {
        this.basex = 0;
        this.basey = 0;
      } else {
        this.basex = basex;
        this.basey = basey;
      }
    }

    createPickVertex(graphStorage: GraphStorage, component: BPELComponent, parent: any) {
        // image style
        var style = graphStorage.getGraph().getStylesheet().getDefaultVertexStyle();
        style[mxConstants.STYLE_PERIMETER] = mxConstants.SHAPE_RECTANGLE;
        style[mxConstants.STYLE_SHAPE] = mxConstants.STYLE_IMAGE;
        style[mxConstants.STYLE_IMAGE] = 'src/app/bpel-designer/resources/svg/node.pick.svg';
        style[mxConstants.STYLE_IMAGE_WIDTH] = 300;
        style[mxConstants.STYLE_IMAGE_HEIGHT] = 300;
        // font
        // style[mxConstants.STYLE_FONTFAMILY] = 'Arial';
        style[mxConstants.STYLE_FONTSIZE] = 30;
        style[mxConstants.STYLE_FONTCOLOR] = '#000000';
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_BOTTOM;
        style[mxConstants.STYLE_IMAGE_ASPECT] = 0;
        console.log(style);
        const styleName = "style" + component.id;
        const styleStorage = new StyleStorage(styleName, style);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);

        const width = 100;
        const height = 100;
        let pickGeometry = new mxGeometry(this.basex, this.basey, width, height);
        let pickVertexStorage = graphStorage.insertSVGVertex(null, component.id, component, pickGeometry, styleStorage, styleName);

        return pickVertexStorage;
    }

    createComponent(graphStorage: GraphStorage, component: BPELComponent, parent: any) {
        let pickVertexStorage = this.createPickVertex(graphStorage, component, parent);

        component["x"] = pickVertexStorage.getVertexX();
        component["y"] = pickVertexStorage.getVertexY();
        component["width"] = pickVertexStorage.getVertexWidth();
        component["height"] = pickVertexStorage.getVertexHeight();

        return pickVertexStorage;
    }
}