import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CodeEditorDialogComponent } from '../code-editor-dialog/code-editor-dialog.component';

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
   
  constructor(
    public dialogRef: MatDialogRef<CodeEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any
  ) {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}