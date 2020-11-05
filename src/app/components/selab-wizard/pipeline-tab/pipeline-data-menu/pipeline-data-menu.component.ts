import { Component, Input, OnInit } from '@angular/core';
import { ServiceComponentModel } from 'src/app/models/service-component-dependency';
import { NavigationItem } from './navigationItem';

@Component({
  selector: 'pipeline-data-menu',
  templateUrl: './pipeline-data-menu.component.html',
  styleUrls: ['./pipeline-data-menu.component.css']
})
export class PipelineDataMenuComponent implements OnInit {
  returnData: {};
  menuData: NavigationItem;
  menuTitle: string;
  constructor() {
    this.menuData = new NavigationItem();
  }

  update(returnData, serviceComponent: ServiceComponentModel) {
    this.returnData = returnData;
    this.menuTitle = serviceComponent.getName();
    let testingObj = {
      "department": {
        "name": "",
        "description": "",
        "category": {
          "item": {
            "name": "",
            "description": "",
            "id": ""
          },
          "name": "",
          "id": ""
        }
      }
    }
    this.convertReturnDataToMenuData(testingObj,this.menuData);
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
  }
}
