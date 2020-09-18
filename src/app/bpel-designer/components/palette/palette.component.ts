import { Component, OnInit } from "@angular/core";
import { GraphStorage, StyleStorage } from "src/app/models/modelDependency";
import GraphEditorService from "src/app/services/graph-editor.service";
import { Process } from "../../models/components/component/containers/process.model";

@Component({
    selector: 'palette',
    templateUrl: './palette.component.html',
    styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements OnInit {
    graphStorage: GraphStorage;

    constructor(private graphEditorService: GraphEditorService) {
    }

    ngOnInit(): void {
    }

    draw(): void {
        this.graphStorage = this.graphEditorService.getGraphStorage();
        console.log(this.graphStorage);

        // Take <process> for an example
        let newmxGeometry = new mxGeometry(200, 200, 300, 300);
        // image style
        var style = this.graphStorage.getGraph().getStylesheet().getDefaultVertexStyle();
        style[mxConstants.STYLE_PERIMETER] = mxConstants.SHAPE_RECTANGLE;
        style[mxConstants.STYLE_SHAPE] = mxConstants.STYLE_IMAGE;
        style[mxConstants.STYLE_IMAGE] = 'src/app/bpel-designer/resources/svg/node.Bpel.svg';
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

        const styleName = "style1"
        const styleStorage = new StyleStorage(styleName, style);
        this.graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);

        var v1 = this.graphStorage.insertSVGVertex(null, null, new Process(), newmxGeometry, styleStorage, 'style1');
    }

}