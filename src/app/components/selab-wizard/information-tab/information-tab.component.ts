import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'information-tab',
  templateUrl: './information-tab.component.html',
  styleUrls: ['./information-tab.component.css']
})
export class InformationTabComponent implements OnInit {
  @Input() isPipeline: boolean;
  constructor() { }

  ngOnInit() {
    console.log("Build Tab:" + this.isPipeline)
  }
}