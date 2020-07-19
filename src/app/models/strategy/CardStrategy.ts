
import { ICreateComponentStrategy } from "./ICreateComponentStrategy";
import { GraphStorage } from "../graph-storage.model";
import { StyleLibrary } from "../../shared/styleLibrary";
import StyleStorage from "../style-storage.model";
import DataBinding from "../util/DataBinding";

export class CardStrategy implements ICreateComponentStrategy {
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

        this.strategyName = "Text Strategy";
    }

    createComponent(graphStorage: GraphStorage, component, parent) {
        let cardStyle = StyleLibrary[0]["card"];
        let styleName = "cardStyle" + component.id;
        let cardStyleStorage = new StyleStorage(styleName,cardStyle);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,cardStyle)
        let cardGeometry = new mxGeometry(0,0,300,500);
        let cardVertexStorage = graphStorage.insertVertex(parent,component.id,"",cardGeometry,cardStyleStorage,component);

        // insert care header vertex
        let cardHeaderStyle = StyleLibrary[0]["cardHeader"];
        styleName = "cardHeaderStyle" + component.id;
        let cardHeaderStyleStorage = new StyleStorage(styleName,cardHeaderStyle);
        graphStorage.getGraph().getStylesheet().putCellStyle(styleName,cardHeaderStyle);
        let cardHeaderGeometry = new mxGeometry(150,0,50,50);
        let cardHeaderVertexStorage = graphStorage.insertVertex(cardVertexStorage.getVertex(),component.id,component.header,cardHeaderGeometry,cardHeaderStyleStorage,component);



        // return cardVertexStorage;
        return {
            "vertexStorage": cardVertexStorage,
            "width": 50,
            "height": 100
        }
    }
}