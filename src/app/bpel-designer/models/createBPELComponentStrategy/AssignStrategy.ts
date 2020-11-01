import { GraphStorage, StyleStorage } from "src/app/models/graph-dependency";
import { BPELComponent } from "../components/BPELComponent.model";
import { ICreateBPELComponentStrategy } from "./ICreateBPELComponentStrategy";

export class AssignStrategy implements ICreateBPELComponentStrategy {
    strategyName: string = "<assign> strategy";
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

    createAssignVertex(graphStorage: GraphStorage, component: BPELComponent, parent: any) {
        // image style
        var style = graphStorage.getGraph().getStylesheet().getDefaultVertexStyle();
        style[mxConstants.STYLE_PERIMETER] = mxConstants.SHAPE_RECTANGLE;
        style[mxConstants.STYLE_SHAPE] = mxConstants.STYLE_IMAGE;
        style[mxConstants.STYLE_IMAGE] = 'src/app/bpel-designer/resources/svg/node.action.assign.svg';
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
        let assignGeometry = new mxGeometry(this.basex, this.basey, width, height);
        let assignVertexStorage = graphStorage.insertSVGVertex(parent, component.id, component, assignGeometry, styleStorage, styleName);

        return assignVertexStorage;
    }

    createComponent(graphStorage: GraphStorage, component: BPELComponent, parent: any) {
        let assignVertexStorage = this.createAssignVertex(graphStorage, component, parent);

        component["x"] = assignVertexStorage.getVertexX();
        component["y"] = assignVertexStorage.getVertexY();
        component["width"] = assignVertexStorage.getVertexWidth();
        component["height"] = assignVertexStorage.getVertexHeight();

        return assignVertexStorage;
    }
}