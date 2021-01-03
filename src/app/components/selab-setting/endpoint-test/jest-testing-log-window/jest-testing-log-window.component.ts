import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Terminal } from 'xterm';

@Component({
  selector: 'app-jest-testing-log-window',
  templateUrl: './jest-testing-log-window.component.html',
  styleUrls: ['./jest-testing-log-window.component.css']
})
export class JestTestingLogWindowComponent implements OnInit {
  testcaseLog: string = "";
  logs: {}[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
      this.logs = [];
    }

  appendSuccessLog(line: string) {
    let log = {
      "status": "success",
      "data": line
    }
    this.logs.push(log);
  }

  appendInfoLog(line: string) {
    let log = {
      "status": "info",
      "data": line
    }
    this.logs.push(log);
  }

  appendFailedLog(line:string) {
    let log = {
      "status": "failed",
      "data": line
    }
    this.logs.push(log);
  }

  ngOnInit() {
    this.testcaseLog = this.data.log;
    // this.jestTerminalSerivce.appendInfoMessage(this.testcaseLog);
    let logLines = this.testcaseLog.split("\n");
    setTimeout(() => {
      for (let index = 0; index < logLines.length; index++) {
        console.log(logLines[index]);
        if(logLines[index].includes("✕") || logLines[index].includes("FAIL") || logLines[index].includes("failed"))
          this.appendFailedLog(logLines[index]);
          // this.jestTerminalSerivce.appendErrorMessage(logLines[index]);
        else if(logLines[index].includes("✓") || logLines[index].includes("PASS") || logLines[index].includes("passed"))
          this.appendSuccessLog(logLines[index]);
          // this.jestTerminalSerivce.appendSuccessMessage(logLines[index]);
        else
          this.appendInfoLog(logLines[index]);
          // this.jestTerminalSerivce.appendInfoMessage(logLines[index]);
      }
    },2000);
  }
}
