import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpClientService } from "../http-client.service";
import { Store } from '@ngrx/store';
import { NDLSelector, pageUICDLSelector, projectNameSelector, themeSelector, SUMDLSelector } from "src/app/models/store/selectors/InternalRepresentationSelector";
import { IRDeleteAllDLsAndThemes, IRDeleteNDLPageAction, IRDeletePageUICDLAction, IRDeleteThemeAction, IRInitialNDLAction, IRInsertNDLPageAction, IRInsertPageUICDLAction, IRInsertThemeAction, IROpenNDLFromDBAction, IROpenSUMDLFromDBAction } from 'src/app/models/store/actions/internalRepresentation.action'
import { AppState } from 'src/app/models/store/app.state';
import { concatAll, concatMap, map } from "rxjs/operators";
import { concat, forkJoin } from "rxjs";

@Injectable({
  providedIn: "root"
})

export default class SaveService {
  private baseUrl: string;
  constructor(private httpClient: HttpClient,
    private httpClientService: HttpClientService,
    private store: Store<AppState>) {
    this.baseUrl = "";
  }

  saveProject(projectName: string, userID: string){
    console.log(projectName)
    let themes;
    let pdls;
    let ndls;
    let sumdls
    this.store.select(themeSelector()).subscribe(
      storeThemes => themes = storeThemes
    ).unsubscribe();
    this.store.select(pageUICDLSelector()).subscribe(
      storePDLs => pdls = storePDLs
    ).unsubscribe();

    console.log(pdls)

    this.store.select(NDLSelector()).subscribe(
      storeNDLs => ndls = storeNDLs
    ).unsubscribe();

    this.store.select(SUMDLSelector()).subscribe(
      storeSUMDLs => sumdls = storeSUMDLs
    ).unsubscribe();
    
    let deletePDLTasks = []
    let deleteDLsTasks = []
    let deleteThemeTasks = []
    let insertThemeTasks = []
    let insertPDLTasks = []
    let insertDLsTasks = []

    for(let theme of themes){
      deletePDLTasks.push(this.deletePdlByTheme(projectName, theme["id"]))
      deleteDLsTasks.push(this.deleteNdlByTheme(projectName, theme["id"]));
      deleteDLsTasks.push(this.deleteSumdlByTheme(projectName, theme["id"]));
      deleteThemeTasks.push(this.deleteThemeByID(projectName, theme['id']));
      insertThemeTasks.push(this.postTheme(projectName, {
        themeID: theme['id'],
        themeName: theme['name'],
        userID: userID
      }))
    }
    for(let pageID of Object.keys(pdls)){
      console.log(pageID)
      console.log(pageID[pdls[pageID]])
      insertPDLTasks.push(this.postPageUICDL(projectName, pdls[pageID]['themeId'], pdls[pageID]))
    }
    for(let pageID of Object.keys(ndls)){
      console.log(ndls[pageID])
      insertDLsTasks.push(this.postNDL(projectName, {
        ndl: ndls[pageID],
        pageID: pageID,
        themeID: pdls[pageID]['themeId']
      }))
      insertDLsTasks.push(this.postSUMDL(projectName, {
        sumdl: sumdls[pageID],
        pageID: pageID,
        themeID: pdls[pageID]['themeId']
      }))
    }

    forkJoin(deleteDLsTasks).pipe(
      map(()=> console.log("delete previous DLs complete")),
      concatMap(()=> forkJoin(deletePDLTasks)),
      map(()=> console.log("delete previous PDLs complete")),
      concatMap(()=> forkJoin(deleteThemeTasks)),
      map(()=> console.log("delete previous theme complete")),
      concatMap(() => forkJoin(insertThemeTasks)),
      map(()=> console.log("insert theme complete")),
      concatMap(() => forkJoin(insertPDLTasks)),
      map(()=> console.log("insert pdl complete")),
      concatMap(() => forkJoin(insertDLsTasks)),
      map(()=> console.log("insert ndl, sumdl complete")),
    ).subscribe(response => console.log(response))
  }

  postTheme(projectName, theme){
    let url = `theme`
    let header = { "projectName": projectName }
    return this.httpClientService.httpPost(url, theme, "uiDesignServer", header)
  }

  deleteTheme(projectName){
    let url = `theme`
    let header = { "projectName": projectName }
    return this.httpClientService.httpDelete(url, "uiDesignServer", header);
  }

  postPageUICDL(projectName, themeId, PDL) {
    let url = "page";
    let header = { "projectName": projectName, "themeId": themeId }
    
    return this.httpClientService.httpPost(url, PDL, "uiDesignServer", header)
  }

  deletePageUICDL(projectName){
    let url = "page";
    let header = { "projectName": projectName}
    
    return this.httpClientService.httpDelete(url, "uiDesignServer", header);
  }

  newProject() {
    let url = `trunc`
    let params = new HttpParams();
    return this.httpClientService.httpGet(url, params, "uiDesignServer");
  }

  postNDL(projectName, ndlData) {
    let url = `navigation`
    let header = { "projectName": projectName }
    return this.httpClientService.httpPost(url, ndlData, "uiDesignServer", header)
  }

  postSUMDL(projectName, sumdl) {
    let url = `sumdl`
    let header = { "projectName": projectName }
    return this.httpClientService.httpPost(url, sumdl, "uiDesignServer", header)
  }

  getImageFromModel(graphModel) {
    let url = `navigation/exportPicture`
    let encoder = new mxCodec();
    let result = encoder.encode(graphModel);
    let xml = mxUtils.getXml(result);
    let imageString
    return this.httpClientService.httpPost(url, xml, "uiDesignServer")
  }

  deleteSumdlByTheme(projectName, themeID){
    let url = `sumdl/themeId`
    let header = { "projectName": projectName, "themeID": themeID }
    return this.httpClientService.httpDelete(url, "uiDesignServer", header)
  }

  deletePdlByTheme(projectName, themeID){
    let url = `page/themeId`
    let header = { "projectName": projectName, "themeID": themeID }
    return this.httpClientService.httpDelete(url, "uiDesignServer", header)
  }

  deleteNdlByTheme(projectName, themeID){
    let url = `navigation/themeId`
    let header = { "projectName": projectName, "themeID": themeID }
    return this.httpClientService.httpDelete(url, "uiDesignServer", header)
  }

  deleteThemeByID(projectName, themeID){
    let url = `theme/themeId`
    let header = { "projectName": projectName, "themeID": themeID }
    return this.httpClientService.httpDelete(url, "uiDesignServer", header)
  }

}


