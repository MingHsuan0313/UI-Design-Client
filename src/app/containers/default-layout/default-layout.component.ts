import {Component, Input, OnInit} from '@angular/core';

import {Storage} from '../../shared/storage';
import GraphEditorService from '../../services/externalRepresentation/graph-editor.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import ImportService from '../../services/internalRepresentation/import.service';
import ExportService from '../../services/internalRepresentation/export.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.css']
})
export class DefaultLayoutComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }
}