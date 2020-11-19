import { Component, Input, OnInit } from '@angular/core';
import { ServiceComponentModel } from 'src/app/models/service-component-dependency';
import { Operation } from 'src/app/models/wizard-task-dependency';
import { NavigationItem } from './navigationItem';

@Component({
  selector: 'pipeline-data-menu',
  templateUrl: './pipeline-data-menu.component.html',
  styleUrls: ['./pipeline-data-menu.component.css']
})
export class PipelineDataMenuComponent implements OnInit {
  menuData: NavigationItem;
  menuTitle: string;
  @Input() operation: Operation;
  constructor() {
    this.menuData = new NavigationItem();
  }

  update(operation: Operation) {
    this.menuTitle = operation.name;
    this.convertReturnDataToMenuData(operation.returnData,this.menuData);
    this.menuData = this.menuData.children[0];
  }

  // like bfs
  convertReturnDataToMenuData(object,parentNavItem: NavigationItem) {
    let properties = [];
    for (let key in object) {
      if (typeof (object[key]) === 'string') {
        properties.push(key);
        let navigationItem = new NavigationItem()
                                    .setDisplayName(key);
        parentNavItem.addChild(navigationItem);
      } else if (typeof (object[key]) === 'object') {
        properties.push(key);
        let navigationItem = new NavigationItem()
                                    .setDisplayName(key);
        this.convertReturnDataToMenuData(object[key],navigationItem);
        parentNavItem.addChild(navigationItem);
      }
    }
    return properties;
  }

  ngOnInit() {
    // if open from pipeline
    if(this.operation != undefined) {
      this.menuTitle = this.operation.name;
      this.convertReturnDataToMenuData(this.operation.returnData,this.menuData);
      this.menuData = this.menuData.children[0];
    }
  }
}
