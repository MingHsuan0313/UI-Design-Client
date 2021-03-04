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

  postPageUICDL(PDL) {
    console.log(PDL);
    let url = this.baseUrl;
    return this.httpClientService.httpPost(url, PDL, "uiDesignServer");
  }

  newProject() {
    let url = `${this.baseUrl}/trunc`
    let params = new HttpParams();
    return this.httpClientService.httpGet(url, params, "uiDesignServer");
  }

  postNDL() {
    let url = `${this.baseUrl}/navigation`
    return this.httpClientService.httpPost(url, Storage.navigationFlow, "uiDesignServer");
  }

  getImageFromModel(graphModel) {
    let url = `${this.baseUrl}/navigation/exportPicture`
    let encoder = new mxCodec();
    let result = encoder.encode(graphModel);
    let xml = mxUtils.getXml(result);
    let imageString
    return this.httpClientService.httpPost(url, xml, "uiDesignServer")
  }

}


