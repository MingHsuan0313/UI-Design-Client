import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelabGraphEditorComponent } from '../selab-graph-editor.component';

@Component({
  selector: 'app-tab-name-dialog',
  templateUrl: './tab-name-dialog.component.html',
  styleUrls: ['./tab-name-dialog.component.css']
})
export class TabNameDialogComponent implements OnInit {
  currentTabName: string;

  constructor(
    public dialogRef: MatDialogRef<SelabGraphEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.currentTabName = this.data.tabName.name;
    console.log(this.currentTabName);
  }
  
  closeDialog() {
    this.dialogRef.close(this.currentTabName);
  }

}
