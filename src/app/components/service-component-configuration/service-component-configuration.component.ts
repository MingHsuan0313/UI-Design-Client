import { Component, OnInit } from '@angular/core';
import { UIComponent } from 'src/app/models/model';
import GraphEditorService from 'src/app/services/graph-editor.service';
import ServiceComponentService from 'src/app/services/service-component.service';

@Component({
  selector: 'app-service-component-configuration',
  templateUrl: './service-component-configuration.component.html',
  styleUrls: ['./service-component-configuration.component.css']
})
export class ServiceComponentConfigurationComponent implements OnInit {
  selectedUIComponent: UIComponent;
  constructor(private graphEditorService: GraphEditorService,
    private serviceComponentService: ServiceComponentService) { }

  ngOnInit() {
  }

}
