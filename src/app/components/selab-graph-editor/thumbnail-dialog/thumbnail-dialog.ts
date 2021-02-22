import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SelabGraphEditorComponent } from '../selab-graph-editor.component';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'thumbnail-dialog',
  template: '<img [src]="thumbnail" alt="" width="400" height="200">',
})
export class ThumbnailDialog {
  
    constructor(
      public dialogRef: MatDialogRef<SelabGraphEditorComponent>,
      @Inject(MAT_DIALOG_DATA) public thumbnail: string) {
      }
  
    onNoClick(): void {
      this.dialogRef.close();
    }  
}
