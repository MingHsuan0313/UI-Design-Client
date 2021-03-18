import { Component, OnInit } from '@angular/core';
import { ServiceComponentModel } from 'src/app/models/service-component-dependency';

@Component({
  selector: 'app-return-data-menu',
  templateUrl: './return-data-menu.component.html',
  styleUrls: ['./return-data-menu.component.css']
})
export class ReturnDataMenuComponent implements OnInit {
  datas: any[];
  serviceID: string;
  serviceName: string;

  constructor() {
    this.datas = []
    this.serviceID = "0";
    this.serviceName = "";
  }

  render(serviceComponent: ServiceComponentModel) {
    this.datas = serviceComponent.returnData.getReturnDatas()['datas'];
    this.serviceID = serviceComponent.serviceID;
    this.serviceName = serviceComponent.name;
  }

  ngOnInit() {
  }
}