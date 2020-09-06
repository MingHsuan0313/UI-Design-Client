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
  constructor(private graphEditorService: GraphEditorService,
    private styleEditorService: StyleEditorService) { 

  }

  ngOnInit() {
    this.styleEditorService.convertStyleDescriptionToJsobObject("fillColor=#ffffff;fontSize=20;") 
  }

  ngAfterViewInit(){
    this.graph = this.graphEditorService.getGraphStorage().getGraph();
    this.graph.getSelectionModel().addListener(mxEvent.CHANGE, function(sender, evt)
    {
      
      var cells = evt.getProperty('removed');
      console.log(cells);
      // for (var i = 0; i < cells.length; i++)
      // {
      //   // Handle cells[i]...
      // }
    });
  }

}
