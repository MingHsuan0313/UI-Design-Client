import { ICreateComponentStrategy } from "./ICreateComponentStrategy";


import { StyleLibrary } from '../../shared/styleLibrary'
import {CardComposite, DataBinding, StyleStorage, GraphStorage } from '../modelDependency'
import {Library} from '../../shared/library'


export class CardStrategy implements ICreateComponentStrategy {
    strategyName: string;
    basex: number;
    basey: number;
    constructor(basex?,basey?) {
        // basic component
        if(basex == undefined || basey == undefined) {
            this.basex = 0;
            this.basey = 0;
        }
        // inside composite component
        else {
            this.basex = basex;
            this.basey = basey;
        }
        this.strategyName = "Card Strategy";
    }

    createComponent(graphStorage:GraphStorage, component:CardComposite, parent) {


        let styleName = component.type + "style" + component.id;
        let style = StyleLibrary[0]["card"]["cardBox"];
        let styleStorage = new StyleStorage(styleName,style);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,style);
        let cardGeometry = new mxGeometry(0,0,200,200);
        let cardBoxVertex = graphStorage.insertVertex(parent,component.id,"Card",cardGeometry,styleStorage,component);

        let componentListTemp = component.componentList
        let tempHeight = 50;
        let componentHeightGap = 20;
        for(var i =0; i<Library.compositeComponents.card.length; i++){

            for(let element of componentListTemp) {
                if(element.type == Library.compositeComponents.card[i]){
                    graphStorage.createComponent(element,cardBoxVertex.getVertex(),0,tempHeight);

                    tempHeight = tempHeight + element.height + componentHeightGap;

                }
            }
        }


        let componetList = component.componentList;
        let maxWidth = 0;
        let height = 0;
        let hasButton = false;
        for(var i=0; i<componetList.length; i++){
            if(maxWidth < componetList[i].width){
                maxWidth = componetList[i].width
            }
            console.log(componetList[i].height)
            if(componetList[i].type == "button"){
                if (!hasButton){
                    height = height + componetList[i].height + componentHeightGap;
                    hasButton = true;
                }
            }else{
                height = height + componetList[i].height + componentHeightGap;
            }
        }
        height = height + 50;
        maxWidth = maxWidth +50;
        console.log("Here!!")
        console.log(height)
        console.log(maxWidth)

        cardGeometry = new mxGeometry(0,0,maxWidth,height);
        cardBoxVertex.vertex.setGeometry(cardGeometry);
        console.log(cardBoxVertex.vertex)
        let centerX = maxWidth/2;
        console.log(centerX)

        for(let element of componentListTemp) {
            console.log(element)
            let geometry = element.vertexStorage.vertex.getGeometry();
            console.log(geometry)
            geometry.x = centerX-element.width/2;

            element.vertexStorage.vertex.setGeometry(geometry);
        }

        graphStorage.getGraph().refresh();
    }
}
