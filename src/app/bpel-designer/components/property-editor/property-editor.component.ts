import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from "@angular/core";
import { GraphStorage } from "src/app/models/modelDependency";
import GraphEditorService from "src/app/services/graph-editor.service";
import { BPELComponentAttribute } from "../../models/components/attribute/BPELComponent-attribute.model";

@Component({
    selector: 'property-editor',
    templateUrl: './property-editor.component.html',
    styleUrls: ['./property-editor.component.scss']
})
export class PropertyEditorComponent implements OnInit {
    graphStorage: GraphStorage;
    graph: any;
    selectedVertex: mxCell;
    selectedAttribute: BPELComponentAttribute;
    kvPairs: [string, any][];

    constructor(private graphEditorService: GraphEditorService){
    }

    ngOnInit() {
        this.graphStorage = this.graphEditorService.getGraphStorage();
        this.graph = this.graphEditorService.getGraphStorage().getGraph();

        this.graph.addListener(mxEvent.CLICK, (sender, event) => {
          if (sender.selectionModel.cells[0] == undefined) {
            this.selectedVertex = null;
            this.selectedAttribute = null;
            this.kvPairs = null;
          } else {
            this.selectedVertex = sender.selectionModel.cells[0];
            let vertexStorage = this.graphStorage.findVertexStorageByID(this.selectedVertex["id"]);
            this.selectedAttribute = vertexStorage.getComponent().getAttribute();
            console.log("Select Vertex");
            console.log(vertexStorage);
            this.kvPairs = Object.entries(this.selectedAttribute);
            console.log("Parse selected attribute k, v pairs to PropertyEditor")
            console.log(this.kvPairs)
          }
          //TODO: SYNC BPELComponentAttribute model when input value modified
          //this.syncEditorWithSelectedVertex(styleObj);
        })
    }

    getKey(kv) {
        return kv[0];
    }

    getValue(kv) {
        return kv[1];
    }
}