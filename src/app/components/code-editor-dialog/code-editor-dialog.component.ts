import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import ServiceComponentService from 'src/app/services/serviceComponent/service-component.service';
import { CodeEditorComponent } from '../code-editor/code-editor.component' ;

@Component({
  selector: 'app-code-editor-dialog',
  templateUrl: './code-editor-dialog.component.html',
  styleUrls: ['./code-editor-dialog.component.scss']
})
export class CodeEditorDialogComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private serviceComponentService: ServiceComponentService) { }

  openDialog() {
    let dialogRef = this.dialog.open(CodeEditorComponent, {
      width: '850px',
      height: '550px',
      panelClass: 'backdropBackground',
      data: {
        code: this.serviceComponentService.getCode(), 
        name: this.serviceComponentService.getSelectedServiceComponentName()
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
