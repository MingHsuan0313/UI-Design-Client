import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { StyleLibrary } from "../../shared/styleLibrary";
import StyleStorage from "../style-storage.model";
import { constants } from "buffer";

export class TableStrategy implements ICreateComponentStrategy {
    strategyName: string;
    constructor() {
        this.strategyName = "Button Strategy";
    }

    createComponent(graphStorage: GraphStorage, component, parent) {
        console.log("compoennt here")
        console.log(component)
        const heightValue = 50;
        const widthValue = 100;
        let headerList = component.headers.split(" ");
        let colNumber = headerList.length;
        let rows = component.row.split(";")
        let rowNumber = rows.length;
        
        // table box
        let styleName = "tableBoxstyle" + component.id;
        let tableBoxStyle = StyleLibrary[0]["tableBox"];
        tableBoxStyle["overflow"] = true;
        let styleStorage = new StyleStorage(styleName, tableBoxStyle);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName, tableBoxStyle);
        let width = widthValue*colNumber;
        let height = heightValue*(rowNumber+1);

        let tableBoxVertexGeometry = new mxGeometry(0,0,width,height);
        let tableBoxVertexStorage = graphStorage.insertVertex(parent, component.id, "This is Box", tableBoxVertexGeometry, styleStorage, component);


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
            tableHeaderVertexGeometry = new mxGeometry(x,0,widthValue,heightValue);
            let tableHeaderVertexStorage = graphStorage.insertVertex(tableBoxVertexStorage.getVertex(), component.id + "header", headerList[i], tableHeaderVertexGeometry, styleStorage, component);
            tableBoxVertexStorage.addChild(tableHeaderVertexStorage.id);
        }
        


        let tableDataVertexGeometry;
        let tableDataStyle
        console.log(colNumber)
        for(var j=0; j<rowNumber; j++){
            console.log(rows[j])
            if(j%2==0){
                tableDataStyle = StyleLibrary[0]["tableData_grey"];
            }else{
                tableDataStyle = StyleLibrary[0]["tableData_white"];
            }
            tableDataStyle["overflow"] = true;
            let rowData = rows[j].split(" ");
            for(var i=0; i<colNumber; i++){

                styleName = "tableDatastyle" + component.id + ":"+j+","+i;
                styleStorage = new StyleStorage(styleName, tableDataStyle);
                graphStorage.getGraph().getStylesheet().putCellStyle(styleName, tableDataStyle);

                let x = (i)*widthValue;
                let y = (j+1)*heightValue;
                tableDataVertexGeometry = new mxGeometry(x,y,widthValue,heightValue);
                let tableDataVertexStorage = graphStorage.insertVertex(tableBoxVertexStorage.getVertex(), component.id + "header", rowData[i], tableDataVertexGeometry, styleStorage, component);
                tableBoxVertexStorage.addChild(tableDataVertexStorage.id);
            }
        }
    }
}