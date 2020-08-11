import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'java'};
  code: string = 
  `public class Main {
   public static void main(String args[]) {

   }\n}`;
  constructor() { }

  ngOnInit() {
  }

}
