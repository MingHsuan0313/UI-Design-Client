import { Component, OnInit } from "@angular/core";
import { GraphStorage } from "src/app/models/modelDependency";
import GraphEditorService from "src/app/services/graph-editor.service";
import { Process } from "../../models/components/containers/process/process.model";
import { ProcessElement } from "../../models/components/containers/process/process-element.model";
import { BPELComponent } from "../../models/components/BPELComponent.model";

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
    attributeKVPairsStack: [string, any][][];
    elementKVPairsStack: [string, any][][];
    objectStack: any[];
    nullAttributeKVPairs: [string, any][] = [["NO any attribute", "NO any attribute content"]];
    nullElementKVPairs: [string, any][] = [["NO any element", "NO any element content"]];

    constructor(private graphEditorService: GraphEditorService){
    }

    ngOnInit() {
        this.graphStorage = this.graphEditorService.getGraphStorage();
        this.graph = this.graphEditorService.getGraphStorage().getGraph();

        this.graph.addListener(mxEvent.CLICK, (sender) => {
          if (sender.selectionModel.cells[0] == undefined) {
            this.selectedVertex = null;
            this.selectedAttribute = null;
            this.attributeKVPairsStack = null;
          } else {
            this.selectedVertex = sender.selectionModel.cells[0];
            let vertexStorage = this.graphStorage.findVertexStorageByID(this.selectedVertex["id"]);
            let selectedComponent = vertexStorage.getComponent();
            this.selectedAttribute = selectedComponent.getAttribute();
            this.selectedElement = selectedComponent.getElement();
            console.log("Select Vertex");
            console.log(vertexStorage);

            this.objectStack = [];
            this.objectStack.push(selectedComponent);
            console.log("[INFO] Push selected object to objectStack");
            console.log(this.objectStack);
            this.attributeKVPairsStack = [];
            this.elementKVPairsStack = [];
            if (this.selectedAttribute == undefined) {
                this.attributeKVPairsStack.push(this.nullAttributeKVPairs);
            } else {
                this.attributeKVPairsStack.push(Object.entries(this.selectedAttribute));
                // if (selectedComponent instanceof Process) {
                //     this.attributeKVPairsStack.push(["variables", Object.entries((selectedComponent.getElement() as ProcessElement).getVariables().getElement().getVariableList()[0])]); //TODO: For now, take first variable for example
                // }
                console.log("1. Parse selected attribute k, v pairs to PropertyEditor")
                console.log(this.attributeKVPairsStack)
            }
            if (this.selectedElement == undefined) {
                this.elementKVPairsStack.push(this.nullElementKVPairs);
            } else {
                this.elementKVPairsStack.push(Object.entries(this.selectedElement));
                console.log("2. Parse selected element k, v pairs to PropertyEditor");
                console.log(this.elementKVPairsStack);
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
        console.log("[INFO] the toppest object = ");
        console.log(this.objectStack[this.objectStack.length - 1]);
        console.log("Editing attribute field = " + attributeKey);
        this.objectStack[this.objectStack.length - 1].getAttribute()[attributeKey] = event.target.value;
        console.log(this.objectStack[this.objectStack.length - 1].getAttribute()[attributeKey]);

        if (attributeKey == 'name') {
            this.graph.getModel().beginUpdate();
            try {
                this.graph.getModel().setValue(this.selectedVertex, event.target.value);
            }
            finally {
                this.graph.getModel().endUpdate();
            }
        }
    }

    syncSelectedElement(elementKey: any, event: any) {
        console.log("[INFO] the toppest object = ");
        console.log(this.objectStack[this.objectStack.length - 1]);
        console.log("Editing element field = " + elementKey);
        this.objectStack[this.objectStack.length - 1].getElement()[elementKey] = event.target.value;
        console.log(this.objectStack[this.objectStack.length - 1].getElement()[elementKey]);
    }

    isElementString(elementField: any): boolean {
        if (typeof elementField == "string") {
            return true;
        }
        return false;
    }

    isElementArray(elementField: any): boolean {
        if (Array.isArray(elementField)) {
            return true;
        }
        return false;
    }

    showModal(key: string, value: any): void {
        this.objectStack.push(value);
        if (value.getAttribute() == undefined) {
            this.attributeKVPairsStack.push(null);
        } else {
            this.attributeKVPairsStack.push(Object.entries(value.getAttribute()));
        }
        if (value.getElement() == undefined) {
            this.elementKVPairsStack.push(null);
        } else {
            this.elementKVPairsStack.push(Object.entries(value.getElement()));
        }

        console.log("[INFO] Editing the default element, show the default modal: ");
        console.log("1. objectStack= ");
        console.log(this.objectStack);
        console.log("2. attributeKVPairsStack = ")
        console.log(this.attributeKVPairsStack);
        console.log("3. elementKVPairsStack =")
        console.log(this.elementKVPairsStack);
        console.log(this.graphStorage.findVertexStorageByID(this.selectedVertex["id"]).getComponent());

        // $('#exampleModal').on('show.bs.modal', function (event) {
        //     // var button = $(event.relatedTarget)
        //     var targetNode = key;
        //     var modal = $(this);
        //     modal.find('.modal-title').text('Edit <' + targetNode + '>');
        //     modal.find('.modal-body label').text(targetNode);
        //   })
    }

    showArrayModal(key: string, value: any): void {
        this.objectStack.push(value);
        this.attributeKVPairsStack.push(null);
        // treat an array as an element
        this.elementKVPairsStack.push(Object.entries(value));

        console.log("[INFO] Editing the array element, show the array modal: ");
        console.log("1. objectStack= ");
        console.log(this.objectStack);
        console.log("2. attributeKVPairsStack = ")
        console.log(this.attributeKVPairsStack);
        console.log("3. elementKVPairsStack =")
        console.log(this.elementKVPairsStack);
        // if (value.getAttribute() == undefined) {
        //     this.attributeKVPairsStack.push(null);
        // } else {
        //     this.attributeKVPairsStack.push(Object.entries(value.getAttribute()));
        // }

        // $('#exampleModal').on('show.bs.modal', function (event) {
        //     // var button = $(event.relatedTarget)
        //     var targetNode = key;
        //     var modal = $(this);
        //     modal.find('.modal-title').text('Edit <' + targetNode + '>');
        //     modal.find('.modal-body label').text(targetNode);
        //   })
    }

    close(): void {
        this.objectStack.pop();
        this.attributeKVPairsStack.pop();
        this.elementKVPairsStack.pop();

        console.log("[INFO] After close the toppest element: ");
        console.log("1. objectStack= ");
        console.log(this.objectStack);
        console.log("2. attributeKVPairsStack = ")
        console.log(this.attributeKVPairsStack);
        console.log("3. elementKVPairsStack =")
        console.log(this.elementKVPairsStack);
    }

    // TODO: same id's stacked modals will cause a big disaster
    // addArrayElement(): void {
    //     this.objectStack[this.objectStack.length - 2].getElement().add();
    // }

    // removeArrayElement(): void {
    //     this.objectStack[this.objectStack.length - 2].getElement().remove();
    // }
}