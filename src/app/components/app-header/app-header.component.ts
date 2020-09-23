import { Component, OnInit } from '@angular/core';
import GraphEditorService from 'src/app/services/externalRepresentation/graph-editor.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  constructor(private graphEditorService:GraphEditorService) { }

  save() {
    this.graphEditorService.syncStorage();
  }

  ngOnInit() {
  }

}

