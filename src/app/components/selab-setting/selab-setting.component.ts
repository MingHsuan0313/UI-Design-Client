import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import GraphEditorService from '../../services/externalRepresentation/graph-editor.service';
import ExportService from '../../services/internalRepresentation/export.service';
import {MatTabsModule} from '@angular/material/tabs';
import { ComponentInfoComponent } from './component-info/component-info.component';
import { UIComponent } from 'src/app/models/ui-component-dependency';

@Component({
  selector: 'selab-setting',
  templateUrl: './selab-setting.component.html',
  styleUrls: ['./selab-setting.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelabSettingComponent implements OnInit {

  files: any[] = [];
  image: any;
  @ViewChild("settingInfo") componentInfo: ComponentInfoComponent;

  constructor(private graphEditorService: GraphEditorService, private exportService: ExportService) {
  }

  ngOnInit() {
  }
  
  update(uiComponent: UIComponent) {
    this.componentInfo.update(uiComponent);
  }
  
  clear() {
    this.componentInfo.clear();
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