import { Injectable } from "@angular/core";
import { Button } from "protractor";
import * as UIComponentModel from "src/app/models/ui-component-dependency";
import { ButtonComponent, CardComponent, DropdownComponent, FormComponent, InputTextComponent, TableComponent, TextComponent } from "src/app/models/ui-component-dependency";

@Injectable({
    providedIn: "root"
})
export default class IRTransformer {

    constructor(){}

    public transform(pageUICDL: Object, graph:mxGraph): UIComponentModel.UIComponent[]{
        console.log(this.parsePageUICDL(pageUICDL))

        let graphModel = graph.model;
        
        // console.log(graphModel);
        // var parent = graph.getDefaultParent();
        // var index = graphModel.getChildCount(parent);
        // let style = "opacity=0;fontSize=16;fontColor=#20a8d8;"
        // //var v1 = new mxCell("Hello", new mxGeometry(380,380,100,100), style);
        // graph.insertVertex(parent, 2, "Hello", 50, 50, 300, 300, style, "");
        // //  try
        // //  {
        // //     graphModel.beginUpdate()
        // //      graphModel.add(parent, v1, index);
        // //  }
        // //  finally
        // //  {
        // //      graphModel.endUpdate();
        // //  }


        return this.parsePageUICDL(pageUICDL);
    }

    parsePageUICDL(pageUICDL: Object){
        let pageName = pageUICDL["name"]
        let uiComponentObjectList = pageUICDL["body"]["componentList"]
        let uiComponentList = []
        uiComponentObjectList.forEach(
            uiComponentObject => {
            uiComponentList.push(this.parseComponentObject(uiComponentObject))
        })
        return uiComponentList;
    }


    parseComponentObject(uiComponentObject: Object){
        let type = uiComponentObject["type"]
        let uiComponent;
        switch(type){
            case "button":
                
                uiComponent = new ButtonComponent();
                Object.assign(uiComponent, uiComponentObject)
                break;
            case "input":
                uiComponent = new InputTextComponent();
                Object.assign(uiComponent, uiComponentObject)
                break;    
            case "text":
                uiComponent = new TextComponent();
                Object.assign(uiComponent, uiComponentObject)
                break;    
            case "dropdown":
                uiComponent = new DropdownComponent();
                Object.assign(uiComponent, uiComponentObject)
                break;        
            case "table":
                uiComponent = new TableComponent();
                Object.assign(uiComponent, uiComponentObject)
                break;   
            case "card":
                uiComponent = uiComponentObject as CardComponent;
                console.log(uiComponent)
                break;         
            case "form":
                uiComponent = new FormComponent();
                Object.assign(uiComponent, uiComponentObject)
                uiComponent.componentList = this.createSubComponentByObject(uiComponentObject["componentList"])
                // componentList.forEach(
                //     subComponent => {
                //         uiComponent.componentList.push(this.parseComponentObject(subComponent))
                //     }
                // )                
                console.log(uiComponent)
                break;    

        }
        return uiComponent;
    }

    createSubComponentByObject(componentList: Object[]){
        var outputComponentList = [];
        componentList.forEach(
            subComponent => {
                outputComponentList.push(this.parseComponentObject(subComponent))
            }
        ) 
        return outputComponentList;
    }


}