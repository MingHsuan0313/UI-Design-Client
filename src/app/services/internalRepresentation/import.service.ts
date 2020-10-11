import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Storage } from "../../shared/storage";
import { HttpClientService } from "../http-client.service";


@Injectable({
  providedIn: "root"
})

export default class ImportService {

  baseUrl: string;
  files:any[];
  pagesText:any;
  pages: any;
  constructor(private httpClient: HttpClient,
    private httpClientService: HttpClientService) {
    this.baseUrl = "page";

  }
  import() {
    // document.getElementById('pictures').clicka();
    console.log("start import")
    this.getPageUICDL().subscribe(
      response => {
        this.pagesText = response["body"];
        this.pages = JSON.parse(this.pagesText);
        for(let i in this.pages) {
          let components = JSON.parse(this.pages[i]["pdl"]);
          this.pages[i]["components"] = [];
          for(let component of components["componentList"]["componentList"]){
            this.pages[i]["components"].push(component["selector"]);
          }

        }
        console.log(this.pages);
      }
    );



  }

  getPageUICDL() {
    let url = this.baseUrl;
    let params = new HttpParams();
    return this.httpClientService.httpGet(url,params,"uiDesignServer");
    // return this.httpClient.get("http://localhost:8080",
    //   {
    //     headers: new HttpHeaders().set("Content-Type", "application/json"),
    //     observe: "response", withCredentials: true, responseType: "text"
    //   }
    // );
  }

  getFiles() {
    const file = <HTMLInputElement>document.getElementById("pictures");
    for (let i = 0; i < file.files.length; i++) {
      this.files.push(file.files.item(i));
    }
    return this.files;
  }
}
