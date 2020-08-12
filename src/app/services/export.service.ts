import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Storage} from '../shared/storage';
import  GraphEditorService  from './graph-editor.service'


@Injectable({
  providedIn: "root"
})

export default class ExportService {

  constructor(private httpClient: HttpClient, private graphEditorService: GraphEditorService) {

  }

  export(){
    var xmlDoc = mxUtils.createXmlDocument();
    var root = xmlDoc.createElement('output');
    xmlDoc.appendChild(root);

    var xmlCanvas = new mxXmlCanvas2D(root);
    var imgExport = new mxImageExport();
    imgExport.drawState(this.graphEditorService.graphStorage.getGraph().getView().getState(this.graphEditorService.graphStorage.getGraph().model.root), xmlCanvas);

    var bounds = this.graphEditorService.graphStorage.getGraph().getGraphBounds();
    var w = Math.ceil(bounds.x + bounds.width);
    var h = Math.ceil(bounds.y + bounds.height);

    var xml = mxUtils.getXml(root);
    console.log(xml);
    new mxXmlRequest('export', 
                      'format=png&w=' + w + '&h=' + h + '&bg=#F9F7ED&xml=' + encodeURIComponent(xml))
        .simulate(document, '_blank');
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

}

