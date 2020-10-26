import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'compose-tab',
  templateUrl: './compose-tab.component.html',
  styleUrls: ['./compose-tab.component.css']
})
export class ComposeTabComponent implements OnInit {
  @Input() isPipeline: boolean;
  constructor() { }

  ngOnInit() {
    console.log("Build Tab:" + this.isPipeline)
  }

}
