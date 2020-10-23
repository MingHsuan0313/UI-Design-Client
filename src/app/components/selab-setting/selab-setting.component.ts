import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import GraphEditorService from '../../services/externalRepresentation/graph-editor.service';
import ExportService from '../../services/internalRepresentation/export.service';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'selab-setting',
  templateUrl: './selab-setting.component.html',
  styleUrls: ['./selab-setting.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelabSettingComponent implements OnInit {

  files: any[] = [];
  image: any;

  constructor(private graphEditorService: GraphEditorService, private exportService: ExportService) {
  }

  ngOnInit() {
  }

  insertArrow() {
    // this.graphEditorService.addArrow();
  }

  onsubmit() {
    const file = <HTMLInputElement>document.getElementById('pictures');
    for (let i = 0; i < file.files.length; i++) {
      this.files.push(file.files.item(i));
    }
    console.log(this.files);
  }
}