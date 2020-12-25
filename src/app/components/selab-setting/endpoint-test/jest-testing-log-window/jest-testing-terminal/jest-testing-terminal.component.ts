import { Component, OnInit } from '@angular/core';
import { JestTerminalService } from '../jest-terminal.service';

@Component({
  selector: 'app-jest-testing-terminal',
  templateUrl: './jest-testing-terminal.component.html',
  styleUrls: ['./jest-testing-terminal.component.css']
})
export class JestTestingTerminalComponent implements OnInit {

  container: HTMLElement;
  constructor(private jestTerminalService: JestTerminalService) { }

  ngOnInit() {
    let term = this.jestTerminalService.getTerminal();
    this.container = document.getElementById("jest-terminal");
    term.open(this.container);
  }
}
