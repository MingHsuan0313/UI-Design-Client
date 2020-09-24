import { GraphStorage, StyleStorage } from "src/app/models/modelDependency";
import { BPELComponent } from "../components/component/BPELComponent.model";
import { ICreateBPELComponentStrategy } from "./ICreateBPELComponentStrategy";

export class SequenceStrategy implements ICreateBPELComponentStrategy {
    strategyName: string = "<sequence> strategy";
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

    createSequenceVertex(graphStorage: GraphStorage, component: BPELComponent, parent: any) {
        // image style
        var style = graphStorage.getGraph().getStylesheet().getDefaultVertexStyle();
        style[mxConstants.STYLE_PERIMETER] = mxConstants.SHAPE_RECTANGLE;
        style[mxConstants.STYLE_SHAPE] = mxConstants.STYLE_IMAGE;
        style[mxConstants.STYLE_IMAGE] = 'src/app/bpel-designer/resources/svg/node.sequence.svg';
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
        let sequenceGeometry = new mxGeometry(this.basex, this.basey, width, height);
        let sequenceVertexStorage = graphStorage.insertSVGVertex(null, component.id, component, sequenceGeometry, styleStorage, styleName);

        return sequenceVertexStorage;
    }

    createComponent(graphStorage: GraphStorage, component: BPELComponent, parent: any) {
        let sequenceVertexStorage = this.createSequenceVertex(graphStorage, component, parent);

        component["x"] = sequenceVertexStorage.getVertexX();
        component["y"] = sequenceVertexStorage.getVertexY();
        component["width"] = sequenceVertexStorage.getVertexWidth();
        component["height"] = sequenceVertexStorage.getVertexHeight();

        return sequenceVertexStorage;
    }
}