import { GraphStorage, StyleStorage } from "src/app/models/graph-dependency";
import { BPELComponent } from "../components/BPELComponent.model";
import { ICreateBPELComponentStrategy } from "./ICreateBPELComponentStrategy";

export class ExitStrategy implements ICreateBPELComponentStrategy {
    strategyName: string = "<exit> strategy";
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

    createExitVertex(graphStorage: GraphStorage, component: BPELComponent, parent: any) {
        // construct image style
        var style = graphStorage.getGraph().getStylesheet().getDefaultVertexStyle();
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
        style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
        style[mxConstants.STYLE_IMAGE] = 'src/app/bpel-designer/resources/icon/exit.png';
        style[mxConstants.STYLE_IMAGE_WIDTH] = 20;
        style[mxConstants.STYLE_IMAGE_HEIGHT] = 20;
        style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_LEFT;
        style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
        // font
        style[mxConstants.STYLE_FONTFAMILY] = 'Verdana';
        style[mxConstants.STYLE_FONTSIZE] = 16;
        style[mxConstants.STYLE_FONTCOLOR] = '#000000';
        // bind style
        console.log(style);
        const styleName = "style" + component.id;
        const styleStorage = new StyleStorage(styleName, style);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);

        const width = 150;
        const height = 30;
        let exitGeometry = new mxGeometry(this.basex, this.basey, width, height);
        let exitVertexStorage = graphStorage.insertSVGVertex(parent, component.id, component, exitGeometry, styleStorage, styleName);

        return exitVertexStorage;
    }

    createComponent(graphStorage: GraphStorage, component: BPELComponent, parent: any) {
        let exitVertexStorage = this.createExitVertex(graphStorage, component, parent);

        component["x"] = exitVertexStorage.getVertexX();
        component["y"] = exitVertexStorage.getVertexY();
        component["width"] = exitVertexStorage.getVertexWidth();
        component["height"] = exitVertexStorage.getVertexHeight();

        return exitVertexStorage;
    }
}