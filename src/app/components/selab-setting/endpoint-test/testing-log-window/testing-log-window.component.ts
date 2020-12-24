import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-testing-log-window',
  templateUrl: './testing-log-window.component.html',
  styleUrls: ['./testing-log-window.component.css']
})
export class TestingLogWindowComponent implements OnInit {

  invokeServicelog: string = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.invokeServicelog = this.data.log;
  }
}