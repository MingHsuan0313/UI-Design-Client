import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from "@angular/core";
import { GraphStorage } from "src/app/models/modelDependency";
import GraphEditorService from "src/app/services/graph-editor.service";
import { BPELComponentAttribute } from "../../models/components/BPELComponent-attribute.model";
import { Process } from "../../models/components/containers/process/process.model";
import { ProcessElement } from "../../models/components/containers/process/process-element.model";
import { BPELComponentElement } from "../../models/components/BPELComponent-element.model";

@Component({
    selector: 'property-editor',
    templateUrl: './property-editor.component.html',
    styleUrls: ['./property-editor.component.scss']
})
export class PropertyEditorComponent implements OnInit {
    graphStorage: GraphStorage;
    graph: any;
    selectedVertex: mxCell;
    selectedAttribute: any;
    selectedElement: any;
    attributeKVPairs: [string, any][];
    elementKVPairs: [string, any][];

    constructor(private graphEditorService: GraphEditorService){
    }

    ngOnInit() {
        this.graphStorage = this.graphEditorService.getGraphStorage();
        this.graph = this.graphEditorService.getGraphStorage().getGraph();

        this.graph.addListener(mxEvent.CLICK, (sender, event) => {
          if (sender.selectionModel.cells[0] == undefined) {
            this.selectedVertex = null;
            this.selectedAttribute = null;
            this.attributeKVPairs = null;
          } else {
            this.selectedVertex = sender.selectionModel.cells[0];
            let vertexStorage = this.graphStorage.findVertexStorageByID(this.selectedVertex["id"]);
            let selectedComponent = vertexStorage.getComponent();
            this.selectedAttribute = selectedComponent.getAttribute();
            this.selectedElement = selectedComponent.getElement();
            console.log("Select Vertex");
            console.log(vertexStorage);
            if (this.selectedAttribute == undefined) {
                this.attributeKVPairs = [];
                this.attributeKVPairs.push(["NO any attribute", "NO any attribute content"]);
            } else {
                this.attributeKVPairs = Object.entries(this.selectedAttribute);
                if (selectedComponent instanceof Process) {
                    this.attributeKVPairs.push(["variables", Object.entries((selectedComponent.getElement() as ProcessElement).getVariables().getElement().getVariableList()[0])]); //TODO: For now, take first variable for example
                }
                console.log("Parse selected attribute k, v pairs to PropertyEditor")
                console.log(this.attributeKVPairs)
            }
            if (this.selectedElement == undefined) {
                this.elementKVPairs = [];
                this.elementKVPairs.push(["NO any element", "NO any element content"]);
            } else {
                this.elementKVPairs = Object.entries(this.selectedElement);
                console.log("Parse selected element k, v pairs to PropertyEditor");
                console.log(this.elementKVPairs);
            }
          }
        })
    }

    getKey(kv) {
        return kv[0];
    }

    getValue(kv) {
        return kv[1];
    }

    syncSelectedAttribute(attributeKey: any, event: any) {
        if (attributeKey == 'name') {
            this.graph.getModel().beginUpdate();
            try {
                this.graph.getModel().setValue(this.selectedVertex, event.target.value);
            }
            finally {
                this.graph.getModel().endUpdate();
            }
        }
        this.selectedAttribute[attributeKey] = event.target.value;
    }
}