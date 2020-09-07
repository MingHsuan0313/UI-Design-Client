import { Component, OnInit } from '@angular/core';
import GraphEditorService from '../../services/graph-editor.service'
import StyleEditorService from '../../services/style-editor.service';
import { StyleStorage } from 'src/app/models/modelDependency';


@Component({
  selector: 'app-style-editor',
  templateUrl: './style-editor.component.html',
  styleUrls: ['./style-editor.component.css']
})
export class StyleEditorComponent implements OnInit {
  graph: any;
  graphStorage: any;
  colorPicker: String;
  opacity: boolean;
  shadow: boolean;
  rounded: boolean;
  selectedVertex: any;
  selectedStyleStorage: StyleStorage;

  constructor(private graphEditorService: GraphEditorService,
    private styleEditorService: StyleEditorService) {
    this.colorPicker = "#ffffff";
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
    if(this.shadow) {
      this.selectedStyleStorage.changeShadow("1");
      oldStyle.shadow = "1";
    }
    else {
      this.selectedStyleStorage.changeShadow("0");
      oldStyle.shadow = "0";
    }
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.graph.refresh();
  }

  toggleOpacity(event) {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    if(this.opacity) {
      oldStyle.opacity = "100";
      this.selectedStyleStorage.changeOpacity("100");
    }
    else {
      oldStyle.opacity = "0";
      this.selectedStyleStorage.changeOpacity("0");
    }
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.graph.refresh();
  }

  toggleRounded(event) {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    if(this.rounded) {
      oldStyle.rounded = "1";
      this.selectedStyleStorage.changeRounded("1");
    }
    else {
      oldStyle.rounded = "0";
      this.selectedStyleStorage.changeRounded("0");
    }
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.graph.refresh();
  }

  ngOnInit() {
    this.graphStorage = this.graphEditorService.getGraphStorage();
    this.graph = this.graphEditorService.getGraphStorage().getGraph();

    this.graph.addListener(mxEvent.CLICK, (sender, event) => {
      this.selectedVertex = sender.selectionModel.cells[0];
      this.selectedStyleStorage = this.graphStorage.findVertexStorageByID(this.selectedVertex["id"]).getStyleStorage();
      
      let vertexStyleDescription = this.selectedVertex.style;
      let styleObj = this.styleEditorService.convertStyleDescriptionToJsobObject(vertexStyleDescription);
      if(styleObj["fillColor"] != undefined) {
        this.colorPicker = styleObj["fillColor"];
      }
      else
        this.colorPicker = "#ffffff";

      if(styleObj["rounded"] != undefined) {
        if(styleObj["rounded"] == "1")
          this.rounded = true;
        else
          this.rounded = false;
      }
      else
        this.rounded = false;

      if(styleObj["shadow"] != undefined) {
        if(styleObj["shadow"] == "1")
          this.shadow = true;
        else
          this.shadow = false;
      }
      else
        this.rounded = false;
      if(styleObj["opacity"] != undefined) {
        if(styleObj["opacity"] == "100")
          this.opacity = true;
        else
          this.opacity = false;
      }
      else
        this.opacity = false;
    })
    this.styleEditorService.convertStyleDescriptionToJsobObject("fillColor=#ffffff;fontSize=20;")
  }

  ngAfterViewInit() {
    this.graph.getSelectionModel().addListener(mxEvent.CHANGE, function (sender, evt) {

      var cells = evt.getProperty('removed');
      console.log(cells);
    });
  }
}
