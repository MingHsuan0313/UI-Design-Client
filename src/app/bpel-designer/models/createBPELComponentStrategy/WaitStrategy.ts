import { GraphStorage, StyleStorage } from "src/app/models/graph-dependency";
import { BPELComponent } from "../components/BPELComponent.model";
import { ICreateBPELComponentStrategy } from "./ICreateBPELComponentStrategy";

export class WaitStrategy implements ICreateBPELComponentStrategy {
    strategyName: string = "<wait> strategy";
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

    createWaitVertex(graphStorage: GraphStorage, component: BPELComponent, parent: any) {
        // image style
        var style = graphStorage.getGraph().getStylesheet().getDefaultVertexStyle();
        style[mxConstants.STYLE_PERIMETER] = mxConstants.SHAPE_RECTANGLE;
        style[mxConstants.STYLE_SHAPE] = mxConstants.STYLE_IMAGE;
        style[mxConstants.STYLE_IMAGE] = 'src/app/bpel-designer/resources/svg/node.action.wait.svg';
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
        let waitGeometry = new mxGeometry(this.basex, this.basey, width, height);
        let waitVertexStorage = graphStorage.insertSVGVertex(parent, component.id, component, waitGeometry, styleStorage, styleName);

        return waitVertexStorage;
    }

    createComponent(graphStorage: GraphStorage, component: BPELComponent, parent: any) {
        let waitVertexStorage = this.createWaitVertex(graphStorage, component, parent);

        component["x"] = waitVertexStorage.getVertexX();
        component["y"] = waitVertexStorage.getVertexY();
        component["width"] = waitVertexStorage.getVertexWidth();
        component["height"] = waitVertexStorage.getVertexHeight();

        return waitVertexStorage;
    }
}