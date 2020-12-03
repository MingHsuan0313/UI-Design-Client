import { Component, OnInit } from '@angular/core';
import GraphEditorService from '../../services/externalRepresentation/graph-editor.service'
import StyleEditorService from '../../services/externalRepresentation/style-editor.service';
import { GraphStorage, VertexStorage, StyleStorage } from "../../models/graph-dependency";


@Component({
  selector: 'app-style-editor',
  templateUrl: './style-editor.component.html',
  styleUrls: ['./style-editor.component.css']
})
export class StyleEditorComponent implements OnInit {
  graph: any;
  selectedVertex: any;

  fillColor: string;
  borderColor: string;
  opacity: string;
  fontSize: string;
  fontColor: string;
  shadow: boolean;
  rounded: boolean;

  constructor(private graphEditorService: GraphEditorService,
    private styleEditorService: StyleEditorService) {
    this.fillColor = "#000000";
    this.borderColor = "#000000";
    this.fontColor = "#000000";
    this.opacity = "100";
    this.fontSize = "12";
    this.rounded = false;
    this.shadow = false;
  }

  configure() {
    let graph = this.graphEditorService.getGraph();

    graph.addListener(mxEvent.CLICK, (sender, event) => {
      console.log("style editor sync heree");
      this.selectedVertex = sender.selectionModel.cells[0];
      console.log(this.selectedVertex);
      if (this.selectedVertex != undefined) {
        let styleObj = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
        console.log(styleObj);
        this.syncEditorWithSelectedVertex(styleObj);
      }
      // let vertexStorage = this.graphStorage.findVertexStorageByID(this.selectedVertex["id"]);
      // this.selectedStyleStorage = vertexStorage.getStyleStorage();
      // let vertexStyleDescription = this.selectedVertex.style;
      // this.syncEditorWithSelectedVertex(styleObj);
    })
    // this.styleEditorService.convertStyleDescriptionToJsobObject("fillColor=#ffffff;fontSize=20;")
  }

  changeFontSize() {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    oldStyle["fontSize"] = this.fontSize;
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.graphEditorService.getGraph().refresh();
  }

  changeFontColor() {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    oldStyle["fontColor"] = this.fontColor;
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.graphEditorService.getGraph().refresh();
  }
  
  changeBorderColor() {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    oldStyle["strokeColor"] = this.borderColor;
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.graphEditorService.getGraph().refresh();
  }

  changeFillColor() {
    console.log(this.fillColor)
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    oldStyle["fillColor"] = this.fillColor;
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.graphEditorService.getGraph().refresh();
  }

  toggleShadow() {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    if (this.shadow) {
      oldStyle["shadow"] = "1";
    }
    else {
      oldStyle["shadow"] = "0";
    }
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.graphEditorService.getGraph().refresh();
  }

  changeOpacity(event) {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    oldStyle["opacity"] = this.opacity;
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.graphEditorService.getGraph().refresh();
  }

  toggleRounded(event) {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    if (this.rounded) {
      oldStyle["rounded"] = "1";

    }
    else {
      oldStyle["rounded"] = "0";
    }
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.graphEditorService.getGraph().refresh();
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
      this.fillColor = styleObj["fillColor"];
    }
    else
      this.fillColor = "#000000";

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

    if (styleObj["opacity"] != undefined) {
        this.opacity = styleObj["opacity"];
    }
    else
      this.opacity = "100";

    if (styleObj["fontSize"] != undefined) {
      this.fontSize = styleObj["fontSize"];
    }

    if (styleObj["fontColor"] != undefined) {
      this.fontColor = styleObj["fontColor"];
    }
    
    if(styleObj["strokeColor"] != undefined) {
      this.borderColor = styleObj["strokeColor"];
    }
  }
}
