import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Storage} from '../shared/storage';


@Injectable({
  providedIn: "root"
})

export default class ExportService {

  constructor(private httpClient: HttpClient) {

  }


  postPageUICDL(PDL) {
    return this.httpClient.post("http://localhost:8080", PDL,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
        observe: "response", withCredentials: true, responseType: "text"
      }
    );
  }

  newProject() {
    return this.httpClient.get("http://localhost:8080/trunc",
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
        observe: "response", withCredentials: true, responseType: "text"
      }
    );
  }

  postNDL(){
    return this.httpClient.post("http://localhost:8080/navigate", Storage.navigationFlow,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
        observe: "response", withCredentials: true, responseType: "text"
      }
    );
  }

  postImage() {
    return this.httpClient.post("http://localhost:8080/exportPicture", 'hi',
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
        observe: "response", withCredentials: true, responseType: "text"
      }
    );
  }
}


