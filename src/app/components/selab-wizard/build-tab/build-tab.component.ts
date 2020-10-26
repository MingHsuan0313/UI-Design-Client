import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'build-tab',
  templateUrl: './build-tab.component.html',
  styleUrls: ['./build-tab.component.css']
})
export class BuildTabComponent implements OnInit {
  @Input() isPipeline: boolean;
  constructor() { }

  ngOnInit() {
    console.log("Build Tab:" + this.isPipeline)
  }
}
