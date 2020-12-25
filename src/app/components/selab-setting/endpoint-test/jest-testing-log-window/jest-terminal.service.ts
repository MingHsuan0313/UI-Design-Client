import { Injectable } from '@angular/core';
import { Terminal } from 'xterm';

@Injectable({
  providedIn: 'root'
})
export class JestTerminalService {
  public term: Terminal;
  constructor() {
    this.term = new Terminal({
      convertEol: true,
      fontFamily: `"Fira Mono", monospace`,
      fontSize: 15,
      rendererType: 'dom'
    });

    this.term.setOption('theme', {
      background: "#282C34",
    })
  }

  getTerminal(): Terminal {
    return this.term;
  }

  clearTerminal() {
    this.term.clear();
  }

  appendErrorMessage(message: string) {
    message = `\x1b[1;31m` + message;
    this.term.writeln(message);
  }

  appendSuccessMessage(message: string) {
    message = `\x1b[1;32m` + message;
    this.term.writeln(message);
  }

  appendInfoMessage(message: string) {
    message = `\x1b[1;37m` + message;
    this.term.writeln(message);
  }

}
