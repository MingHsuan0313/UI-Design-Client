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
    this.baseUrl = "page";

  }


  postPageUICDL(PDL) {
    console.log(PDL);
    let url = this.baseUrl;
    return this.httpClientService.httpPost(url,PDL);
    // return this.httpClient.post("http://localhost:8080", PDL,
    //   {
    //     headers: new HttpHeaders().set("Content-Type", "application/json"),
    //     observe: "response", withCredentials: true, responseType: "text"
    //   }
    // );
  }

  newProject() {
    let url = `${this.baseUrl}/trunc`
    let params = new HttpParams();
    return this.httpClientService.httpGet(url,params);
    // return this.httpClient.get("http://localhost:8080/trunc",
    //   {
    //     headers: new HttpHeaders().set("Content-Type", "application/json"),
    //     observe: "response", withCredentials: true, responseType: "text"
    //   }
    // );
  }

  postNDL(){
    let url = `${this.baseUrl}/navigation`
    return this.httpClientService.httpPost(url,Storage.navigationFlow);
    // return this.httpClient.post("http://localhost:8080/navigate", Storage.navigationFlow,
    //   {
    //     headers: new HttpHeaders().set("Content-Type", "application/json"),
    //     observe: "response", withCredentials: true, responseType: "text"
    //   }
    // );
  }

  postImage(xml) {
    let url = `${this.baseUrl}/navigation/exportPicture`
    return this.httpClientService.httpPost(url,xml);
    // return this.httpClient.post("http://localhost:8080/exportPicture", xml,
    //   {
    //     headers: new HttpHeaders().set("Content-Type", "application/json"),
    //     observe: "response", withCredentials: true, responseType: "text"
    //   }
    // );
  }
}


