import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-name-dialog',
  templateUrl: './project-name-dialog.component.html',
  styleUrls: ['./project-name-dialog.component.css']
})
export class ProjectNameDialogComponent implements OnInit {
  projectName: string;

  constructor() { }

  ngOnInit() {
  }

}
