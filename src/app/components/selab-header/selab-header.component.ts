import { Component, OnInit } from '@angular/core';
import GraphEditorService from 'src/app/services/externalRepresentation/graph-editor.service';

@Component({
  selector: 'selab-header',
  templateUrl: './selab-header.component.html',
  styleUrls: ['./selab-header.component.scss']
})
export class SelabHeaderComponent implements OnInit {

  constructor(private graphEditorService:GraphEditorService) { }

  save() {
    this.graphEditorService.syncStorage();
  }

  ngOnInit() {
  }

}

