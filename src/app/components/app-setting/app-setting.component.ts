import {Component, OnInit} from '@angular/core';
import GraphEditorService from '../../services/graph-editor.service';
import ExportService from '../../services/export.service';

@Component({
  selector: 'app-setting',
  templateUrl: './app-setting.component.html',
  styleUrls: ['./app-setting.component.scss']
})
export class AppSettingComponent implements OnInit {

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


