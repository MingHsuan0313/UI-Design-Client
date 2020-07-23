import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { StyleLibrary } from "../../shared/styleLibrary";
import { StyleStorage } from "../style-storage.model";
import { Table } from '../modelDependency'

export class TableStrategy implements ICreateComponentStrategy {
    strategyName: string;
    basex: number;
    basey: number;
    
    constructor(basex?, basey?) {
        // basic component
        if (basex == undefined || basey == undefined) {
            this.basex = 0;
            this.basey = 0;
        }
        // inside composite component
        else {
            this.basex = basex;
            this.basey = basey;
        }

        this.strategyName = "Button Strategy";
    }

    createComponent(graphStorage: GraphStorage, component:Table, parent) {
        console.log("compoennt here")
        console.log(component)
        const heightValue = 50;
        const widthValue = 100;
        let headerList = component.headers;
        let colNumber = headerList.length;
        let data = component.data;
        let rowNumber = data.length;
        
    //     var testStyle = [];
         mxConstants.SHADOW_OPACITY = 0.3
    //     testStyle[mxConstants.SHADOWCOLOR] = "B";
    //    // testStyle["Hi"] = 2;
    //     console.log("Here!!")
    //     console.log(testStyle)
    //     console.log(mxConstants.SHADOWCOLOR)
    //     console.log("Here2!!")
        
        // table box

        let styleName = "tableBoxstyle" + component.id;
        let tableBoxStyle = StyleLibrary[0]["tableBox"];
        tableBoxStyle["overflow"] = true;
        let styleStorage = new StyleStorage(styleName, tableBoxStyle);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName, tableBoxStyle);
        let width = widthValue*colNumber;
        let height = heightValue*(rowNumber+1);

        let tableBoxVertexGeometry = new mxGeometry(this.basex,this.basey,width,height);
        let tableBoxVertexStorage = graphStorage.insertVertex(parent, component.id, "This is Box", tableBoxVertexGeometry, styleStorage, component);
        component.width = width;
        component.height = height;

        let tableHeaderVertexGeometry;
        console.log(colNumber)
        for(var i=0; i<colNumber; i++){
            styleName = "tableHeaderstyle" + component.id + ":"+i;
            let tableHeaderStyle = StyleLibrary[0]["tableHeader"];
            tableHeaderStyle["overflow"] = true;
            console.log(tableHeaderStyle)
            styleStorage = new StyleStorage(styleName, tableHeaderStyle);
            graphStorage.getGraph().getStylesheet().putCellStyle(styleName, tableHeaderStyle);
            let x = i*widthValue;
            tableHeaderVertexGeometry = new mxGeometry(this.basex + x,this.basey + 0,widthValue,heightValue);
            let tableHeaderVertexStorage = graphStorage.insertVertex(tableBoxVertexStorage.getVertex(), component.id + "header", headerList[i], tableHeaderVertexGeometry, styleStorage, component);
            tableBoxVertexStorage.addChild(tableHeaderVertexStorage.id);
        }



        let tableDataVertexGeometry;
        let tableDataStyle
        console.log(colNumber)
        for(var j=0; j<rowNumber; j++){

            if(j%2==0){
                tableDataStyle = StyleLibrary[0]["tableData_grey"];
            }else{
                tableDataStyle = StyleLibrary[0]["tableData_white"];
            }
            tableDataStyle["overflow"] = true;
            
            for(var i=0; i<colNumber; i++){

                styleName = "tableDatastyle" + component.id + ":"+j+","+i;
                styleStorage = new StyleStorage(styleName, tableDataStyle);
                graphStorage.getGraph().getStylesheet().putCellStyle(styleName, tableDataStyle);

                let x = (i)*widthValue;
                let y = (j+1)*heightValue;
                tableDataVertexGeometry = new mxGeometry(x,y,widthValue,heightValue);
                let tableDataVertexStorage = graphStorage.insertVertex(tableBoxVertexStorage.getVertex(), component.id + "header", data[i][j], tableDataVertexGeometry, styleStorage, component);
                tableBoxVertexStorage.addChild(tableDataVertexStorage.id);
            }
        }
        // component.vertexStorage = tableBoxVertexStorage;
    }
}
