import { Component, OnInit } from '@angular/core';
import ImportService from '../../services/import.service';
import ExportService from '../../services/export.service';
import GraphEditorService from '../../services/graph-editor.service';
import {Storage} from '../../shared/storage';
import vertexStorage from '../../models/vertex-storage.model';
import { StyleStorage } from '../../models/style-storage.model';
import { PropertyGenerator } from '../../shared/property-generator'


@Component({
  selector: 'app-nav-editor',
  templateUrl: './nav-editor.component.html',
  styleUrls: ['./nav-editor.component.css']
})
export class NavEditorComponent implements OnInit {
  private images: any[] = [];
  private files: any[];
  private imageCount = 0;
  private imageObservable;

  constructor(private importService: ImportService, private exportService: ExportService, private graphEditorService: GraphEditorService) { 
    this.files = this.importService.pages;
    this.images = Storage.images;
    // this.imageObservable = of(Storage.images);
    // this.imageObservable.subscribe({
    //   next: x =>{
    //     console.log(x);
    //   }
    // })

  }

  postXML() {
    let encoder = new mxCodec();

    let result = encoder.encode(this.graphEditorService.getGraphStorage().getGraph().getModel());
    let xml = mxUtils.getXml(result);
    console.log(xml)
    let pageUICDL = Storage.getPageUICDL();
    console.log(pageUICDL)
    pageUICDL["xml"] = xml;
    this.exportService.postImage(xml).subscribe(
      response => {
        let pageID = "Page" + this.imageCount++;
        let image = {};
        image["page"] = pageID;
        image["img"] = 'data:image/png;base64,' + response['body'];
        Storage.images.push(image);
        pageUICDL["image"] = JSON.stringify(image["img"]);
        this.makeDragableOfDom(pageID, pageUICDL, this.graphEditorService.graphStorage.vertexStorageList);
      
      }
    )
  }

  makeDragableOfDom(id, pageUICDL, vertexStorageList){
    let xml = pageUICDL["xml"];
    setTimeout(function(graph){ 
      var img = document.getElementById(id); 
      var funct = function(graph, evt, cell, x, y)
      {
        let doc = mxUtils.parseXml(xml);
        let codec = new mxCodec(doc);
        let elt = doc.documentElement.firstChild.firstChild;
        let cells = [];
        let idMapping = {};
        while (elt != null)
        {
          var childID = elt.getAttribute("id");

          if(childID== "0" || childID == "1" ){
            elt = elt.nextSibling;
            continue;
          }
          let componentSelector = elt.getAttribute("selector");
        //  console.log(componentSelector);
          let uiComponent;
          let findMatchComponent = function(UICDL, selector){
            if(UICDL["componentList"]!=undefined){
            //  console.log(UICDL["componentList"]);

              for(let component of UICDL["componentList"]){
                     if(selector==component["selector"]){
                     //  console.log(component);
                       uiComponent = component;
                     }else{
                    //   console.log(component);
                    //   console.log(selector);
                       uiComponent = findMatchComponent(component, selector);
                     }
                   }
            }
            return uiComponent;
          }
          uiComponent = findMatchComponent(pageUICDL, componentSelector);
          console.log(uiComponent)

          let cell = codec.decode(elt)
          let maxID = (Object.values(graph.getModel().cells)).reduce((acc: number, cur: mxCell)=>{
            return Math.max(acc, parseInt(cur.id));
          }, 0);
          let newChildID = PropertyGenerator.getID(maxID);
          //console.log(cell)
          cell.parent = null;
          idMapping[cell.id] = newChildID;
          cell.id = newChildID;
          graph.getModel().beginUpdate();
          try{
            var childCell = graph.getModel().add(graph.getDefaultParent(), cell);
          }
          finally{
            graph.getModel().endUpdate();
          }
          cells.push(childCell);
          var parentID = idMapping[elt.getAttribute("parent")];
          if(parentID!=null){
            var parentCell = cells.find(cell => cell.id == parentID); 
            graph.getModel().add(parentCell, childCell); 
          }

          let vs: vertexStorage = new vertexStorage(childCell, new StyleStorage("", childCell.style), );
          elt = elt.nextSibling;
        }
        console.log(graph.getModel().cells); 
      }
      mxUtils.makeDraggable(img, graph, funct, img);
    }, 300, this.graphEditorService.getGraphStorage().getGraph() );
    
  }

  


  ngOnInit() {
  }
  showFiles() {
  }
  showImage() {
    
  }


}
