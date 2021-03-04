import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelabGraphEditorComponent } from '../selab-graph-editor.component';

@Component({
  selector: 'egde-information-dialog',
  templateUrl: './egde-information-dialog.component.html',
  styleUrls: ['./egde-information-dialog.component.css']
})
export class EdgeInformationDialogComponent implements OnInit {
  passingParameter: string;

  constructor(
    public dialogRef: MatDialogRef<SelabGraphEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.passingParameter = "";
  }
  
  closeDialog() {
    this.dialogRef.close(this.passingParameter);
  }

}
