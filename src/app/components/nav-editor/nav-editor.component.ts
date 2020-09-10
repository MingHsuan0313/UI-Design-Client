import { Component, OnInit } from '@angular/core';
import ImportService from '../../services/import.service';
import ExportService from '../../services/export.service';
import GraphEditorService from '../../services/graph-editor.service';
import {Storage} from '../../shared/storage';
import vertexStorage from '../../models/vertex-storage.model';
import { StyleStorage } from '../../models/style-storage.model';
import { PropertyGenerator } from '../../shared/property-generator'
import {DataBinding} from '../../models/util/DataBinding'
import { ICreateComponentStrategy } from '../../models/createComponentStrategy/ICreateComponentStrategy';
import { ButtonStrategy } from '../../models/createComponentStrategy/ButtonStrategy';
import { TextStrategy } from '../../models/createComponentStrategy/TextStrategy';
import { DropdownStrategy } from '../../models/createComponentStrategy/DropdownStrategy';
import { TableStrategy } from '../../models/createComponentStrategy/TableStrategy';
import { FormStrategy } from '../../models/createComponentStrategy/FormStrategy';
import { CardStrategy } from '../../models/createComponentStrategy/CardStrategy';
import { BreadcrumbStrategy } from '../../models/createComponentStrategy/BreadcrumbStrategy';
import { IconStrategy } from '../../models/createComponentStrategy/IconStrategy';
import { InputStrategy } from '../../models/createComponentStrategy/InputStrategy';
import { LayoutStrategy } from '../../models/createComponentStrategy/LayoutStrategy';
import { from } from 'rxjs';
// import { GraphStorage, UIComponent } from 'src/app/models/modelDependency';
import { GraphStorage } from '../../models/graph-storage.model';
import { UIComponent } from '../../models/model';

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
        this.makeDragableOfDom(pageID, pageUICDL, this.graphEditorService.graphStorage);
      
      }
    )
  }

  makeDragableOfDom(id, pageUICDL, graphStorage: GraphStorage){
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

          let uiComponent: UIComponent;
          let findMatchComponent = function(UICDL, selector){
            if(UICDL["componentList"]!=undefined){
              for(let component of UICDL["componentList"]){
                     if(selector==component["selector"]){
                       uiComponent = component;
                     }else{
                       uiComponent = findMatchComponent(component, selector);
                     }
                   }
            }
            return uiComponent;
          }
          uiComponent = findMatchComponent(pageUICDL, componentSelector);
          // find databinding, isPrimary, componentPart info from xml
          let dataBinding = (elt.getElementsByTagName("DataBinding"))[0];
          let dataBindingObject = new DataBinding(
            dataBinding.getAttribute("hasDataBinding"),
            dataBinding.getAttribute("dataBindingName"),
            dataBinding.getAttribute("isList")
          )
          let isPrimary = elt.getAttribute("isPrimary");
          let componentPart = elt.getAttribute("componentPart");

          // create mxcell 
          let cell = codec.decode(elt)
          // find new id for new mxcell
          let maxID = (Object.values(graph.getModel().cells)).reduce((acc: number, cur: mxCell)=>{
            return Math.max(acc, parseInt(cur.id));
          }, 0);
          let newChildID = PropertyGenerator.getID(maxID);
          cell.parent = null;
          // create mapping betweem new and old id
          idMapping[cell.id] = newChildID;
          cell.id = newChildID;
          // add new mxcell to graph
          graph.getModel().beginUpdate();
          try{
            var childCell = graph.getModel().add(graph.getDefaultParent(), cell);
          }
          finally{
            graph.getModel().endUpdate();
          }
          cells.push(childCell);
          // bind parent cell and child cell in mxgraph
          var parentID = idMapping[elt.getAttribute("parent")];
          if(parentID!=null){
            var parentCell = cells.find(cell => cell.id == parentID); 
            graph.getModel().add(parentCell, childCell); 
          }
          // update new id in component info (internel representation)
          uiComponent.id = newChildID;
        
          // set layout info to storage 
          if(componentSelector=="Layout" && componentPart=="box"){
            Storage.setLayoutComponent(uiComponent);
          }else if(componentSelector!="Layout" && componentPart=="box"){   
            // set component(not layout) info to storage
            Storage.add(uiComponent);
          }
          console.log(Storage.UICDL)
          let vs: vertexStorage = new vertexStorage(childCell, new StyleStorage("", childCell.style), uiComponent, dataBindingObject, isPrimary);
          let parentVertexStorage: vertexStorage = graphStorage.findVertexStorageByID(parentID);
          if(parentVertexStorage!=null){
            if(componentPart == "box"){
              parentVertexStorage.addChild(newChildID, childCell, "componentList", uiComponent);
            }else{
              parentVertexStorage.addChild(newChildID, childCell, componentPart);
            }
          }
          let length = Object.keys(graphStorage.vertexStorageList).length;
          graphStorage.vertexStorageList[length] = vs;   
          console.log(vs)
          elt = elt.nextSibling;
        }

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
