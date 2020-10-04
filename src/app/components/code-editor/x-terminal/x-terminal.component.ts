import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Terminal } from 'xterm';
import XTerminalService from './x-terminal.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-x-terminal',
  templateUrl: './x-terminal.component.html',
  styleUrls: ['./x-terminal.component.scss']
})
export class XTerminalComponent implements OnInit {
  
  container: HTMLElement;

  constructor(private xterminalService: XTerminalService) { }
  

  ngOnInit() {

    let term = this.xterminalService.getTerminal();
    this.container = document.getElementById("terminal");
    term.open(this.container);
    console.log(term);
    // this.xterminalService.appendErrorMessage("error")
    // this.xterminalService.appendInfoMessage("info")
    // this.xterminalService.appendSuccessMessage("success")
    // this.term.fit();
  }

}
