import { Component, OnInit } from '@angular/core';
import GraphEditorService from '../../services/externalRepresentation/graph-editor.service'
import StyleEditorService from '../../services/externalRepresentation/style-editor.service';
import { GraphStorage , VertexStorage , StyleStorage } from "../../models/graph-dependency";


@Component({
  selector: 'app-style-editor',
  templateUrl: './style-editor.component.html',
  styleUrls: ['./style-editor.component.css']
})
export class StyleEditorComponent implements OnInit {
  graph: any;
  graphStorage: GraphStorage;
  selectedVertex: any;
  selectedStyleStorage: StyleStorage;

  colorPicker: String;
  opacity: boolean;
  shadow: boolean;
  rounded: boolean;
  fontSize: String;
  fontColor: String;

  constructor(private graphEditorService: GraphEditorService,
    private styleEditorService: StyleEditorService) {
    this.colorPicker = "#ffffff";
  }

  changeFontSize() {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    oldStyle.fontSize = this.fontSize;
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.selectedStyleStorage.changeFontSize(this.fontSize);
    this.graph.refresh();
    this.graphStorage.setModified();
  }

  changeFontColor() {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    oldStyle.fontColor = this.fontColor;
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.selectedStyleStorage.changeFontColor(this.fontColor);
    this.graph.refresh();
  }

  changeColor(event) {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    oldStyle.fillColor = this.colorPicker;
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.selectedStyleStorage.changeFillColor(this.colorPicker);
    this.graph.refresh();
  }

  toggleShadow(event) {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    if (this.shadow) {
      this.selectedStyleStorage.changeShadow("1");
      oldStyle.shadow = "1";
    }
    else {
      this.selectedStyleStorage.changeShadow("0");
      oldStyle.shadow = "0";
    }
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.graphStorage.setModified();
    this.graph.refresh();
  }

  toggleOpacity(event) {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    if (this.opacity) {
      oldStyle.opacity = "100";
      this.selectedStyleStorage.changeOpacity("100");
    }
    else {
      oldStyle.opacity = "0";
      this.selectedStyleStorage.changeOpacity("0");
    }
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.graphStorage.setModified();
    this.graph.refresh();
  }

  toggleRounded(event) {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    if (this.rounded) {
      oldStyle.rounded = "1";
      this.selectedStyleStorage.changeRounded("1");

    }
    else {
      oldStyle.rounded = "0";
      this.selectedStyleStorage.changeRounded("0");
    }
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.graphStorage.setModified();
    this.graph.refresh();
  }

  ngOnInit() {
    // this.graphStorage = this.graphEditorService.getGraphStorage();
    // this.graph = this.graphEditorService.getGraphStorage().getGraph();

    // this.graph.addListener(mxEvent.CLICK, (sender, event) => {
    //   this.selectedVertex = sender.selectionModel.cells[0];
    //   let vertexStorage = this.graphStorage.findVertexStorageByID(this.selectedVertex["id"]);
    //   this.selectedStyleStorage = vertexStorage.getStyleStorage();
    //   let vertexStyleDescription = this.selectedVertex.style;
    //   let styleObj = this.styleEditorService.convertStyleDescriptionToJsobObject(vertexStyleDescription);
    //   this.syncEditorWithSelectedVertex(styleObj);
    // })
    // this.styleEditorService.convertStyleDescriptionToJsobObject("fillColor=#ffffff;fontSize=20;")
  }

  ngAfterViewInit() {
    // this.graph.getSelectionModel().addListener(mxEvent.CHANGE, function (sender, evt) {
    //   let cells = evt.getProperty('removed');
    // });
  }

  syncEditorWithSelectedVertex(styleObj) {
    if (styleObj["fillColor"] != undefined) {
      this.colorPicker = styleObj["fillColor"];
    }
    else
      this.colorPicker = "#ffffff";

    if (styleObj["rounded"] != undefined) {
      if (styleObj["rounded"] == "1")
        this.rounded = true;
      else
        this.rounded = false;
    }
    else
      this.rounded = false;

    if (styleObj["shadow"] != undefined) {
      if (styleObj["shadow"] == "1")
        this.shadow = true;
      else
        this.shadow = false;
    }
    else
      this.rounded = false;

    if (styleObj["opacity"] != undefined) {
      if (styleObj["opacity"] == "100")
        this.opacity = true;
      else
        this.opacity = false;
    }
    else
      this.opacity = false;

    if(styleObj["fontSize"] != undefined) {
      this.fontSize = styleObj["fontSize"];
    }

    if(styleObj["fontColor"] != undefined) {
      this.fontColor = styleObj["fontColor"];
    }
  }
}
