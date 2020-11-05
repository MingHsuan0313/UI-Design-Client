import { Component, Input, OnInit } from '@angular/core';
import { ServiceComponentModel } from 'src/app/models/service-component-dependency';
import { NavItem } from './nav-item';

@Component({
  selector: 'pipeline-data-menu',
  templateUrl: './pipeline-data-menu.component.html',
  styleUrls: ['./pipeline-data-menu.component.css']
})
export class PipelineDataMenuComponent implements OnInit {

  navItems: NavItem[] = [
    {
      displayName: 'DevFestFL',
      iconName: 'close',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'become-angular-tailer'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'feedback'
        }
      ]
    }]
  returnData: {};
  menuData: {};
  menuTitle: string;
  test = [];
  constructor() {
    this.menuData = {};
    this.test = [1, 2, 3]
  }

  update(returnData, serviceComponent: ServiceComponentModel) {
    this.returnData = returnData;
    this.menuTitle = serviceComponent.getName();
    console.log("ddd")
    console.log(this.returnData);


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
    for (let key in testingObj) {
      this.menuTitle = key;
    }
    console.log("start converting");
    console.log(this.convertReturnDataToMenuData(testingObj));
    console.log(this.menuData);
  }

  // like bfs
  convertReturnDataToMenuData(object) {
    let properties = [];
    for (let key in object) {
      if (typeof (object[key]) === 'string') {
        properties.push(key);
      } else if (typeof (object[key]) === 'object') {
        properties.push(key);
        this.menuData[key] = this.convertReturnDataToMenuData(object[key]);
      }
    }
    return properties;
  }

  ngOnInit() {
  }
}
