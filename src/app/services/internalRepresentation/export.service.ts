import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "../../shared/storage";
import { HttpClientService } from "../http-client.service";


@Injectable({
  providedIn: "root"
})

export default class ExportService {
  private baseUrl: string;
  constructor(private httpClient: HttpClient,
    private httpClientService: HttpClientService) {
    this.baseUrl = "";
  }

  postTheme(projectName, theme){
    let url = `theme`
    let header = { "projectName": projectName }
    return this.httpClientService.httpPost(url, theme, "uiDesignServer", header)
  }

/*
  this.httpClientService.httpDelete(url, "uiDesignServer", header).subscribe(
    response => {
      let url = `theme`
      for(let index=0; index<themes.length; index++){
        let theme = themes[index]
        this.httpClientService.httpPost(url, theme, "uiDesignServer", header).subscribe(
          response => {
            console.log(response["body"])
        })
      }
  })
  */

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

  postNDL(projectName, ndl) {
    // delete previous ndl
    let url = `navigation`
    let header = { "projectName": projectName }

    this.httpClientService.httpDelete(url, "uiDesignServer", header).subscribe(
      response => {
        this.httpClientService.httpPost(url, ndl, "uiDesignServer", header).subscribe(
          response => {
            console.log(response["body"])
        })
    })
    return
  }

  getImageFromModel(graphModel) {
    let url = `navigation/exportPicture`
    let encoder = new mxCodec();
    let result = encoder.encode(graphModel);
    let xml = mxUtils.getXml(result);
    let imageString
    return this.httpClientService.httpPost(url, xml, "uiDesignServer")
  }

}


