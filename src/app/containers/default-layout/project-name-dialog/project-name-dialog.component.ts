import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DefaultLayoutComponent } from '../default-layout.component';

@Component({
  selector: 'app-project-name-dialog',
  templateUrl: './project-name-dialog.component.html',
  styleUrls: ['./project-name-dialog.component.css']
})
export class ProjectNameDialogComponent implements OnInit {
  projectName: string;
  isProjectNameEmpty: boolean;

  constructor(
    public dialogRef: MatDialogRef<DefaultLayoutComponent>,
  ) {
    this.isProjectNameEmpty = false;
    this.projectName = "";

   }
  
  close() {
    if(this.projectName.length > 0) 
      this.dialogRef.close(this.projectName);
    else 
      this.isProjectNameEmpty = true;
  }

  ngOnInit() {
  }
}