import { Component, OnInit } from '@angular/core';
import GraphEditorService from 'src/app/services/externalRepresentation/graph-editor.service';
import { Storage } from "../../shared/storage";

@Component({
  selector: 'selab-header-navigation-form',
  templateUrl: './selab-header-navigation-form.component.html',
  styleUrls: ['./selab-header-navigation-form.component.scss']
})
export class SelabHeaderNavigationFormComponent implements OnInit {

  private images:any[] = [];
  constructor(private graphEditorService:GraphEditorService) { }

  ngOnInit() {
  }
  
  insertEdge(sf) {
    const graphStorage = this.graphEditorService.getGraphStorage();
    const graph = graphStorage.getGraph();
    const parent = graph.getDefaultParent();
    const graphNode = document.getElementById('graphContainer0');
    const defaultWidth = graphNode.offsetWidth;
    const defaultHeight = graphNode.offsetHeight;
    let style = new Object();
    style[mxConstants.STYLE_ROUNDED] = true;
    style[mxConstants.STYLE_FONTSIZE] = 20;
    graph.getStylesheet().putCellStyle('rounded', style);
    let v1 = graphStorage.findVertex(sf['value']['source']);
    let srcStyle = this.findImageStyle(sf['value']['source']);
    let tarStyle = this.findImageStyle(sf['value']['target']);
    if (v1 == null) {
      v1 = graph.insertVertex(parent, null, "", defaultWidth / 2 - 400, defaultHeight / 2, 150, 90, srcStyle, '');
    }
    let v2 = graph.insertVertex(parent, null, "", defaultWidth / 2, defaultHeight / 2, 150, 90, tarStyle, '');
    graphStorage.insertEdge(v1, v2);
    document.getElementById('navigationForm').style.display = 'none';
  }
  
  findImageStyle(page) {
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i]['page'] == page) {

        var style = {};

        style = mxUtils.clone(style); 
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;

        style[mxConstants.STYLE_STROKECOLOR] = '#ffffff';

        style[mxConstants.STYLE_FONTCOLOR] = '#2422a0';

        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;

        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_BOTTOM;

        style[mxConstants.STYLE_FONTSIZE] = 30;

        style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_CENTER;

        style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_CENTER;

        //style[mxConstants.STYLE_IMAGE] = 'images/icons48/gear.png';
        style[mxConstants.STYLE_IMAGE] = Storage.images[i]['img'];

        style[mxConstants.STYLE_IMAGE_WIDTH] = 300;

        style[mxConstants.STYLE_IMAGE_HEIGHT] = 200;

        style[mxConstants.STYLE_SPACING_TOP] = 30;

        style[mxConstants.STYLE_SPACING] = 10;

        style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
        this.graphEditorService.selectedGraphStorage.getGraph().getStylesheet().putCellStyle('style' + i.toString(), style);
        return 'style' + i.toString();
      }
    }
  }
}
