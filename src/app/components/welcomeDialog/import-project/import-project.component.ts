import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-import-project',
  templateUrl: './import-project.component.html',
  styleUrls: ['./import-project.component.css']
})
export class ImportProjectComponent implements OnInit {
  projectOptions: {}[] = [];
  themeOptions: {}[] = [];
  selectedProject: SelabProject;

  constructor(
    public importProjectDialog: MatDialogRef<ImportProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.selectedProject = new SelabProject();
    this.fakeData();
  }

  importProject() {
    console.log('import project');
  }

  ngOnInit() {
  }

  chooseProject(event, project) {
    this.selectedProject = project;
  }

  chooseTheme(event, theme) {
    console.log('choose theme')
    console.log(event);
    console.log(theme);
    if(theme.used)
      theme.completed = true;
  }

  setAll(checked) {
    console.log('set all');
    console.log(checked);
    for(let index = 0;index < this.selectedProject.themes.length; index++) {
      if(this.selectedProject.themes[index]['used'])
        continue;
      this.selectedProject.themes[index]['completed'] = checked;
    }
  }

  fakeData() {
    this.projectOptions = [
      {
        name: "Inventory System",
        themes: [
          {
            name:"Auth Controller",
            used:false,
            completed: false
          },
          {
            name: "Department",
            used: false,
            completed: false
          },
          {
            name: "Category",
            used: true,
            completed: false
          },
          {
            name: "Item",
            used: false,
            completed: false
          },
          {
            name: "Acquisition",
            used: true,
            completed: false
          }
        ],
      },
      {
        name: "ChatBot",
        themes: [
          {
            name: "Authentication",
            used: false,
            completed: false
          },
          {
            name: "Communication",
            used: true,
            completed: false
          },
          {
            name: "Chat Room",
            used: false,
            completed: false
          }
        ],
      },
    ]
  }
}

export class SelabProject {
  themes: string[];
  name: string;

  constructor() {
    this.name = "";
    this.themes = [];
  }
}