import { GraphStorage, StyleStorage } from "src/app/models/graph-dependency";
import { BPELComponent } from "../components/BPELComponent.model";
import { ICreateBPELComponentStrategy } from "./ICreateBPELComponentStrategy";

export class ForEachStrategy implements ICreateBPELComponentStrategy {
    strategyName: string = "<forEach> strategy";
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

    createForEachVertex(graphStorage: GraphStorage, component: BPELComponent, parent: any) {
        // construct image style
        var style = graphStorage.getGraph().getStylesheet().getDefaultVertexStyle();
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
        style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
        style[mxConstants.STYLE_IMAGE] = 'src/app/bpel-designer/resources/icon/foreach.png';
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
        let forEachGeometry = new mxGeometry(this.basex, this.basey, width, height);
        let forEachVertexStorage = graphStorage.insertSVGVertex(parent, component.id, component, forEachGeometry, styleStorage, styleName);

        return forEachVertexStorage;
    }

    createComponent(graphStorage: GraphStorage, component: BPELComponent, parent: any) {
        let forEachVertexStorage = this.createForEachVertex(graphStorage, component, parent);

        component["x"] = forEachVertexStorage.getVertexX();
        component["y"] = forEachVertexStorage.getVertexY();
        component["width"] = forEachVertexStorage.getVertexWidth();
        component["height"] = forEachVertexStorage.getVertexHeight();

        return forEachVertexStorage;
    }
}