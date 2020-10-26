import { GraphStorage, StyleStorage } from "src/app/models/graph-dependency";
import { BPELComponent } from "../components/BPELComponent.model";
import { ICreateBPELComponentStrategy } from "./ICreateBPELComponentStrategy";

export class ElseIfBranchStrategy implements ICreateBPELComponentStrategy {
    strategyName: string = "<elseif> strategy";
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

    createElseIfBranchVertex(graphStorage: GraphStorage, component: BPELComponent, parent: any) {
        // image style
        var style = graphStorage.getGraph().getStylesheet().getDefaultVertexStyle();
        style[mxConstants.STYLE_PERIMETER] = mxConstants.SHAPE_RECTANGLE;
        style[mxConstants.STYLE_SHAPE] = mxConstants.STYLE_IMAGE;
        style[mxConstants.STYLE_IMAGE] = 'src/app/bpel-designer/resources/svg/node.elseif_branch.svg';
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

        const width = 75;
        const height = 75;
        let elseifGeometry = new mxGeometry(this.basex, this.basey, width, height);
        let elseifVertexStorage = graphStorage.insertSVGVertex(null, component.id, component, elseifGeometry, styleStorage, styleName);

        return elseifVertexStorage;
    }

    createComponent(graphStorage: GraphStorage, component: BPELComponent, parent: any) {
        let elseifVertexStorage = this.createElseIfBranchVertex(graphStorage, component, parent);

        component["x"] = elseifVertexStorage.getVertexX();
        component["y"] = elseifVertexStorage.getVertexY();
        component["width"] = elseifVertexStorage.getVertexWidth();
        component["height"] = elseifVertexStorage.getVertexHeight();

        return elseifVertexStorage;
    }
}