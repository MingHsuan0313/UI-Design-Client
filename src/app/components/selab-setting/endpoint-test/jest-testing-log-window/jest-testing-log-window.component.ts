import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Terminal } from 'xterm';
import { JestTerminalService } from './jest-terminal.service';

@Component({
  selector: 'app-jest-testing-log-window',
  templateUrl: './jest-testing-log-window.component.html',
  styleUrls: ['./jest-testing-log-window.component.css']
})
export class JestTestingLogWindowComponent implements OnInit {
  testcaseLog: string = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private jestTerminalSerivce: JestTerminalService) { }

  ngOnInit() {
    this.testcaseLog = this.data.log;
    // this.jestTerminalSerivce.appendInfoMessage(this.testcaseLog);
    let logLines = this.testcaseLog.split("\n");
    setTimeout(() => {
      for (let index = 0; index < logLines.length; index++) {
        console.log(logLines[index]);
        if(logLines[index].includes("✕"))
          this.jestTerminalSerivce.appendErrorMessage(logLines[index]);
        else if(logLines[index].includes("✓"))
          this.jestTerminalSerivce.appendSuccessMessage(logLines[index]);
        else
          this.jestTerminalSerivce.appendInfoMessage(logLines[index]);
      }
    },2000);
  }
}
