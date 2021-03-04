import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelabGraphEditorComponent } from '../selab-graph-editor.component';

@Component({
  selector: 'app-tab-name-dialog',
  templateUrl: './tab-name-dialog.component.html',
  styleUrls: ['./tab-name-dialog.component.css']
})
export class TabNameDialogComponent implements OnInit {
  currentPageName: string;
  currentType: string;
  currentThemeName: string;
  originalName: string;

  constructor(
    public dialogRef: MatDialogRef<TabNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.currentType  = this.data.type;
    if(this.currentType == "theme") {
      this.currentThemeName = this.data.tabName;
      this.originalName = this.currentThemeName;
    }
    else if(this.currentType == "page") {
      this.currentPageName = this.data.tabName;
      this.currentThemeName = this.data.themeName;
      this.originalName = this.currentPageName;
    }
    // console.log(this.currentTabName);
  }
  
  closeDialog() {
    if(this.currentType == 'page') {
      if(this.currentPageName.length != 0)
        this.dialogRef.close(this.currentPageName);
    }

    else if(this.currentType == 'theme') {
      if(this.currentThemeName.length != 0)
        this.dialogRef.close(this.currentThemeName);
    }
  }

  noDialog() {
    this.dialogRef.close(this.originalName);
  }
}
