import { Component, OnInit } from '@angular/core';
import ImportService from '../../services/import.service';
import ExportService from '../../services/export.service';
import GraphEditorService from '../../services/graph-editor.service';
import {Storage} from '../../shared/storage';
import { Observable, BehaviorSubject, of } from 'rxjs';
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
    pageUICDL["xml"] = xml;
    this.exportService.postImage(xml).subscribe(
      response => {
        let page = "Page" + this.imageCount++;
        let image = {};
        image["page"] = page;
        image["img"] = 'data:image/png;base64,' + response['body'];
        Storage.images.push(image);
        pageUICDL["image"] = JSON.stringify(image["img"]);
        this.makeDragableOfDom(page, xml);
      
      }
    )
  }

  makeDragableOfDom(id, xml){

    setTimeout(function(graph){ 
      var img = document.getElementById(id); 
      var funct = function(graph, evt, cell, x, y)
      {
        // var doc = mxUtils.parseXml(xml);
        // var codec = new mxCodec(doc);
        // codec.decode(doc.documentElement, graph.getModel()); 
        let doc = mxUtils.parseXml(xml);
        let codec = new mxCodec(doc);
        let elt = doc.documentElement.firstChild.firstChild;
        let cells = [];
        let idMapping = {};

        while (elt != null)
        {
          //console.log(codec.decode(elt));
          var childID = elt.getAttribute("id");
          if(childID== "0" || childID == "1" ){
            elt = elt.nextSibling;
            continue;
          }


          let cell = codec.decode(elt)
          let maxID = (Object.values(graph.getModel().cells)).reduce((acc, cur)=>{
            return Math.max(acc, parseInt(cur.id));
          }, 0);

          let newChildID = PropertyGenerator.getID(maxID);

          console.log(cell)
          //var childCell = graph.addCell(cell);
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
