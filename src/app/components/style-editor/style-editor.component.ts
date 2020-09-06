import { Component, OnInit } from '@angular/core';
import GraphEditorService from '../../services/graph-editor.service'
import StyleEditorService from '../../services/style-editor.service';


@Component({
  selector: 'app-style-editor',
  templateUrl: './style-editor.component.html',
  styleUrls: ['./style-editor.component.css']
})
export class StyleEditorComponent implements OnInit {
  graph: any;
  colorPicker: String;
  opacity: boolean;
  shadow: boolean;
  rounded: boolean;
  selectedVertex: any;

  constructor(private graphEditorService: GraphEditorService,
    private styleEditorService: StyleEditorService) {
    this.colorPicker = "#ffffff";
  }

  changeColor(event) {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    oldStyle.fillColor = this.colorPicker;
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.graph.refresh();
  }

  toggleShadow(event) {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    if(this.shadow)
      oldStyle.shadow = "1";
    else
      oldStyle.shadow = "0";
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.graph.refresh();
  }

  toggleOpacity(event) {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    if(this.opacity)
      oldStyle.opacity = "100";
    else
      oldStyle.opacity = "0";
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.graph.refresh();
  }

  toggleRounded(event) {
    let oldStyle = this.styleEditorService.convertStyleDescriptionToJsobObject(this.selectedVertex.style);
    if(this.rounded) 
      oldStyle.rounded = "1";
    else
      oldStyle.rounded = "0";
    let newStyleDescription = this.styleEditorService.convertJsonObjectToStyleDescription(oldStyle);
    this.selectedVertex.style = newStyleDescription;
    this.graph.refresh();
  }

  ngOnInit() {
    this.graph = this.graphEditorService.getGraphStorage().getGraph();
    this.graph.addListener(mxEvent.CLICK, (sender, event) => {
      this.selectedVertex = sender.selectionModel.cells[0];
      let vertexStyleDescription = this.selectedVertex.style;
      let styleObj = this.styleEditorService.convertStyleDescriptionToJsobObject(vertexStyleDescription);
      console.log(this.selectedVertex);
      console.log(styleObj)
    })
    this.styleEditorService.convertStyleDescriptionToJsobObject("fillColor=#ffffff;fontSize=20;")
  }

  ngAfterViewInit() {
    this.graph.getSelectionModel().addListener(mxEvent.CHANGE, function (sender, evt) {

      var cells = evt.getProperty('removed');
      console.log(cells);
      // for (var i = 0; i < cells.length; i++)
      // {
      //   // Handle cells[i]...
      // }
    });
  }
}
