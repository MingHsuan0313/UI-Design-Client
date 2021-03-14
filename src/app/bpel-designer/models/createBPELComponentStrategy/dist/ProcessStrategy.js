"use strict";
exports.__esModule = true;
exports.ProcessStrategy = void 0;
var graph_dependency_1 = require("src/app/models/graph-dependency");
var ProcessStrategy = /** @class */ (function () {
    function ProcessStrategy(basex, basey) {
        this.strategyName = "<process> strategy";
        if (basex == undefined || basey == undefined) {
            this.basex = 0;
            this.basey = 0;
        }
        else {
            this.basex = basex;
            this.basey = basey;
        }
    }
    ProcessStrategy.prototype.createProcessVertex = function (graphStorage, component, parent) {
        console.log('ddd');
        console.log(graphStorage);
        // image style
        var style = graphStorage.getGraph().getStylesheet().getDefaultVertexStyle();
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
        var styleName = "style" + component.id;
        var styleStorage = new graph_dependency_1.StyleStorage(styleName, style);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName, style);
        var width = 200;
        var height = 200;
        var processGeometry = new mxGeometry(this.basex, this.basey, width, height);
        var processVertexStorage = graphStorage.insertSVGVertex(parent, component.id, component, processGeometry, styleStorage, styleName);
        return processVertexStorage;
    };
    ProcessStrategy.prototype.createComponent = function (graphStorage, component, parent) {
        var processVertexStorage = this.createProcessVertex(graphStorage, component, parent);
        component["x"] = processVertexStorage.getVertexX();
        component["y"] = processVertexStorage.getVertexY();
        component["width"] = processVertexStorage.getVertexWidth();
        component["height"] = processVertexStorage.getVertexHeight();
        return processVertexStorage;
    };
    return ProcessStrategy;
}());
exports.ProcessStrategy = ProcessStrategy;
