import { Component, OnInit } from '@angular/core';
import GraphEditorService from '../../services/graph-editor.service'


@Component({
  selector: 'app-style-editor',
  templateUrl: './style-editor.component.html',
  styleUrls: ['./style-editor.component.css']
})
export class StyleEditorComponent implements OnInit {
  graph: any;
  cellOnEditted: mxCell;
  constructor(private graphEditorService: GraphEditorService) { 

  }

  ngOnInit() {

  }

  ngAfterViewInit(){
    this.graph = this.graphEditorService.getGraphStorage().getGraph();
    this.graph.getSelectionModel().addListener(mxEvent.CHANGE, function(sender, evt)
    {
      
      var cells = evt.getProperty('removed');
      console.log(cells);
      this.cellOnEditted = cells;
      // for (var i = 0; i < cells.length; i++)
      // {
      //   // Handle cells[i]...
      // }
    });
  }

}
