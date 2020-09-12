import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CodeEditorComponent } from '../code-editor/code-editor.component' ;

@Component({
  selector: 'app-code-editor-dialog',
  templateUrl: './code-editor-dialog.component.html',
  styleUrls: ['./code-editor-dialog.component.css']
})
export class CodeEditorDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    let dialogRef = this.dialog.open(CodeEditorComponent, {
      width: '850px',
      height: '550px',
      data: {
        name: "Tim Hsieh",
        age: 23
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("This dialog was closed");
      console.log(result);
    })
  }

  ngOnInit() {
  }
}
