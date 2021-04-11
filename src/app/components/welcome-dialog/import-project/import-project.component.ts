import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { concat, forkJoin, merge } from 'rxjs';
import { mergeMap, concatMap, map, concatAll } from 'rxjs/operators';
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage'
import LoadService from 'src/app/services/internalRepresentation/Load.service'

@Component({
  selector: 'app-import-project',
  templateUrl: './import-project.component.html',
  styleUrls: ['./import-project.component.css']
})
export class ImportProjectComponent implements OnInit {
  projectOptions: {}[] = [];
  themeOptions: {}[] = [];
  projectID
  selectedProject: SelabProject;

  constructor(
    public importProjectDialog: MatDialogRef<ImportProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router,
    public loadService: LoadService
  ) {
    this.selectedProject = new SelabProject();
    let projectOptionObject = {}

    this.loadService.getProjects(SelabGlobalStorage.getUserID()).pipe(
      map( response => {
        let datas = JSON.parse(response["body"])

        let postTask = [];
        for (data of datas) {
          projectOptionObject[data["projectID"]] = {
            projectID: data["projectID"],
            projectName: data["projectName"],
            groupID: data["groupsTable"]["groupID"],
            groupName: data["groupsTable"]["groupName"],
            themes: []
          }
          postTask.push(this.loadService.getTheme(data["projectName"]));
        }
        return merge(postTask);
      }),
      concatAll(),
      concatAll(),
      map( response => {
        let datas = JSON.parse(response["body"])
        let themes = []
        for (data of datas) {
          themes.push({
            name: data["themeName"],
            id: data["id"],
            used: data["used"],
            selected: false,
          })
          projectOptionObject[data["projectsTable"]["projectID"]].themes = themes;
        }
      })
    ).subscribe(response=> {
     this.projectOptions = Object.values(projectOptionObject);
     console.log(this.projectOptions)
    })
    // this.fakeData();
  }


  importProject() {
    console.log('import project');
    console.log(this.selectedProject);

    let projectName = this.selectedProject.projectName;
    let userID = SelabGlobalStorage.getUserID();
    let themeIDs = []
    for(let theme of this.selectedProject.themes){
      if(theme["selected"]==true){
        themeIDs.push(theme["id"]);
      }
    }

    this.loadService.loadProject(projectName, userID, themeIDs);
    SelabGlobalStorage.setProjectID(this.selectedProject.projectID);
    SelabGlobalStorage.setProjectName(this.selectedProject.projectName);
    this.importProjectDialog.close("open project complete");
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
    if (theme.used)
      theme.selected = false;
  }

  setAll(checked) {
    console.log('set all');
    console.log(checked);
    for (let index = 0; index < this.selectedProject.themes.length; index++) {
      if (this.selectedProject.themes[index]['used'])
        continue;
      this.selectedProject.themes[index]['selected'] = checked;
    }
  }

  cancel() {
    this.router.navigate(['/login']);
  }

    fakeData() {
      this.projectOptions = [
        {
          projectName: "Inventory System",
          groudID: "group1",
          themes: [
            {
              name:"Auth Controller",
              used:false,
              selected: false
            },
            {
              name: "Department",
              used: false,
              selected: false
            },
            {
              name: "Category",
              used: true,
              selected: false
            },
            {
              name: "Item",
              used: false,
              selected: false
            },
            {
              name: "Acquisition",
              used: true,
              selected: false
            }
          ],
        },
        {
          projectName: "ChatBot",
          groudID: "group2",
          themes: [
            {
              name: "Authentication",
              used: false,
              selected: false
            },
            {
              name: "Communication",
              used: true,
              selected: false
            },
            {
              name: "Chat Room",
              used: false,
              selected: false
            }
          ],
        },
      ]
    }
}

export class SelabProject {
  themes: any[];
  projectName: string;
  projectID: string;

  constructor() {
    this.projectName = "";
    this.themes = [];
  }
}