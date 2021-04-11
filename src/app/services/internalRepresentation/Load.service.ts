import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { HttpClientService } from "../http-client.service";
import GraphEditorService from "../externalRepresentation/graph-editor.service";
import { AppState } from 'src/app/models/store/app.state';
import { Store } from '@ngrx/store';
import { PageUICDL } from 'src/app/models/internalRepresentation/pageUICDL.model';
import { pageUICDLSelector, projectNameSelector, themeSelector } from "src/app/models/store/selectors/InternalRepresentationSelector";
import { IRDeleteAllDLsAndThemes, IRDeleteNDLPageAction, IRDeletePageUICDLAction, IRDeleteThemeAction, IRInitialNDLAction, IRInsertNDLPageAction, IRInsertPageUICDLAction, IRInsertThemeAction, IROpenNDLFromDBAction, IROpenSUMDLFromDBAction } from 'src/app/models/store/actions/internalRepresentation.action'
import { forkJoin } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
@Injectable({
  providedIn: "root"
})

export default class LoadService {

  baseUrl: string;
  files:any[];
  pagesText:any;
  pages: any;
  constructor(private httpClient: HttpClient,
    private graphEditorService: GraphEditorService,
    private store: Store<AppState>,
    private httpClientService: HttpClientService) {
    this.baseUrl = "page";
  }

  // import() {
  //   let importProjectName;
  //   let themes
  //   this.store.select(projectNameSelector()).subscribe( projectName => importProjectName = projectName)
  //   console.log(importProjectName)
  //   this.store.dispatch(new IRDeleteAllDLsAndThemes());
  //   this.store.dispatch(new IRInitialNDLAction());

  //   this.getTheme(importProjectName).pipe(
  //     concatMap((response)=> {
  //       console.log(response)
  //       themes = JSON.parse(response['body'])
  //       themes.forEach(theme => {
  //         this.store.dispatch(new IRInsertThemeAction(theme.id, theme.themeName));
  //       })
  //       this.store.dispatch(new IRDeleteThemeAction(0));
  //       return this.getPageUICDL(importProjectName)
  //     }),
  //     concatMap((response)=> {
  //       let pageUICDLs = JSON.parse(response['body'])
  //       console.log(pageUICDLs)
  //       let firstPageID;
  //       pageUICDLs.forEach( (pageUICDL, index) => {
  //         if(index==0){
  //           firstPageID = pageUICDL.id;
  //         }
  //         themes.forEach( (theme, index) => {
  //           if(theme.id == pageUICDL.themeTable.id){
  //             let pageUICDLObject = JSON.parse(pageUICDL.pdl) as PageUICDL
  //             let isMain = pageUICDLObject.isMain;
  //             this.store.dispatch(new IRInsertPageUICDLAction(index, pageUICDLObject, isMain));
  //           }
  //         })
  //       })
  //       this.graphEditorService.changePage(firstPageID, firstPageID);
  //       return this.getNDL(importProjectName)
  //     }),
  //     concatMap((response)=> {
  //       let ndl = JSON.parse(JSON.parse(response['body']).ndl);
  //       if(ndl){
  //         this.store.dispatch(new IROpenNDLFromDBAction(ndl));
  //       }
  //       console.log(ndl)
  //       return this.getSUMDL(importProjectName)
  //     }),
  //     map((response) => {
  //       let sumdl = JSON.parse(JSON.parse(response['body']).sumdl);
  //       if(sumdl){
  //         this.store.dispatch(new IROpenSUMDLFromDBAction(sumdl));
  //       }
  //     })
  //   ).subscribe(response=>console.log(response))
  //   this.store.dispatch(new IRInsertThemeAction("temp","temp"))
  // }

  loadProject(projectName: string, userID: string, themeIDs: string[]){
    this.postProject(projectName, userID, themeIDs).subscribe(
      response => {
        let datas = JSON.parse(response["body"])
        let index = 1;
        console.log(datas)
        this.store.dispatch(new IRDeleteAllDLsAndThemes());
        this.store.dispatch(new IRInsertThemeAction("temp","temp"));
        for(let data of datas){
          let themeName = data["themeName"]
          let themeID = data["themeID"]
          this.store.dispatch(new IRInsertThemeAction(themeID, themeName));
          let pageInfoArray = data["pages"]
          for(let pageInfo of pageInfoArray){
            let pageID = pageInfo["pageID"];
            let pageName = pageInfo["pageName"];
            let ndl = JSON.parse(pageInfo["DLs"]["ndl"]);
            let pdl = JSON.parse(pageInfo["DLs"]["pdl"]);
            let sumdl = JSON.parse(pageInfo["DLs"]["sumdl"]);
            
            this.store.dispatch(new IRInsertPageUICDLAction(index, pdl, pdl["isMain"]));
            this.store.dispatch(new IROpenNDLFromDBAction(pageID, ndl));
            this.store.dispatch(new IROpenSUMDLFromDBAction(pageID, sumdl));
          } 
          index = index + 1
        }

        this.store.dispatch(new IRDeleteThemeAction(0));
      }
    )
  }

  getPageUICDL(projectName: string) {
    let url = this.baseUrl;
    let params = new HttpParams();
    let header = { "projectName": projectName }
    return this.httpClientService.httpGet(url,params,"uiDesignServer", header);
    // return this.httpClient.get("http://localhost:8080",
    //   {
    //     headers: new HttpHeaders().set("Content-Type", "application/json"),
    //     observe: "response", withCredentials: true, responseType: "text"
    //   }
    // );
  }

  postProject(projectName, userID, themeIDs){
    let url = 'project/open';
    let header = { "projectName": projectName, "userID": userID}
    return this.httpClientService.httpPost(url, themeIDs, "uiDesignServer", header);
  }

  getProjects(userID){
    let url = 'project/user';
    let params = new HttpParams();
    let header = { "userID": userID}
    return this.httpClientService.httpGet(url,params,"uiDesignServer", header);
  }


  getTheme(projectName: string){
    let url = 'theme';
    let params = new HttpParams();
    let header = { "projectName": projectName }
    return this.httpClientService.httpGet(url,params,"uiDesignServer", header);
  }

  getNDL(projectName: string){
    let url = 'navigation';
    let params = new HttpParams();
    let header = { "projectName": projectName }
    return this.httpClientService.httpGet(url,params,"uiDesignServer", header);
  }

  getSUMDL(projectName: string){
    let url = 'sumdl';
    let params = new HttpParams();
    let header = { "projectName": projectName }
    return this.httpClientService.httpGet(url,params,"uiDesignServer", header);
  }

  getFiles() {
    const file = <HTMLInputElement>document.getElementById("pictures");
    for (let i = 0; i < file.files.length; i++) {
      this.files.push(file.files.item(i));
    }
    return this.files;
  }

  
}
