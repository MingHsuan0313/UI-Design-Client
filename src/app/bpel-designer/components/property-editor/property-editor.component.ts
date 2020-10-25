import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { GraphStorage } from "src/app/models/modelDependency";
import GraphEditorService from "src/app/services/graph-editor.service";
import { BPELComponent } from "../../models/components/BPELComponent.model";
import IOBPELDocService from "../../services/ioBPELDoc/ioBPELDoc.service";


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
    attributeKVPairsStack: [string, any][][] = [];
    elementKVPairsStack: [string, any][][] = [];
    objectStack: any[] = [];
    isObjectStackEmpty: boolean = true;
    nullAttributeKVPairs: [string, any][] = [["NO any attribute", "NO any attribute content"]];
    nullElementKVPairs: [string, any][] = [["NO any element", "NO any element content"]];
    bpelComponentDict: Map<string, boolean> = new Map<string, boolean>();

    userSettedTargetContainerActivity: BPELComponent;
    @Output() userSettedTargetContainerActivityEvent: EventEmitter<BPELComponent> = new EventEmitter<BPELComponent>();

    constructor(private graphEditorService: GraphEditorService, private ioBPELDocService: IOBPELDocService) {
        this.initBPELComponentDict();

        ioBPELDocService.subscribe((componentNameWithIdStack_curParentNodeNameWithId: [string[], string]) => {
            console.log("============ Subscribed: PropertyEditorComponent.getNextElementModal(), sync() BEGIN ============");

            let componentNameWithIdStack = componentNameWithIdStack_curParentNodeNameWithId[0];
            let curParentNodeNameWithId = componentNameWithIdStack_curParentNodeNameWithId[1];

            if (componentNameWithIdStack.length) {
                let lastNodeNameWithId = componentNameWithIdStack[componentNameWithIdStack.length - 1];
                let lastNodeName = this.extractNameOfComponentNameWithId(lastNodeNameWithId);

                if (curParentNodeNameWithId != undefined) {
                    console.log("[FUCK] curParentNodeNameWithId = " + curParentNodeNameWithId);
                    // not belong to BPELComponent
                    if (!this.bpelComponentDict.get(lastNodeName)) {
                        // variables has no id on graphStorage
                        // idx-- to backtracking
                        // e.g. process <- sequence <- sources <- source
                        let curParentIdx = componentNameWithIdStack.indexOf(curParentNodeNameWithId);
                        let nearestBPELComponentIdx;
                        let nearestBPELComponentVertexStorage;
                        for (let i = curParentIdx; i >= 0; i--) {
                            let nearestBPELComponentParentId = this.extractIdOfComponentNameWithId(componentNameWithIdStack[i]);
                            if (this.graphStorage.findVertexStorageByID(nearestBPELComponentParentId) != undefined) {
                                nearestBPELComponentVertexStorage = this.graphStorage.findVertexStorageByID(nearestBPELComponentParentId);
                                nearestBPELComponentIdx = i;
                                break;
                            }
                        }
                        let editingNode = nearestBPELComponentVertexStorage.getComponent();
                        console.log("nearestBPELComponentIdx = " + nearestBPELComponentIdx + " curParentIdx = " + curParentIdx);
                        for (let i = nearestBPELComponentIdx; i <= curParentIdx; i++) {
                            console.log("editingNode =");
                            console.log(editingNode);

                            this.getNextElementModal("", editingNode);
                            let childElementName = this.extractNameOfComponentNameWithId(componentNameWithIdStack[i + 1]);
                            this.elementKVPairsStack[this.elementKVPairsStack.length - 1].forEach(([key, value]) => {
                                if (key == childElementName) {
                                    editingNode = value;
                                }
                            });
                        }
                        this.close();
                    }
                }
            }
            console.log("============ Subscribed: PropertyEditorComponent.getNextElementModal(), sync() END ============");
        });
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
            this.isObjectStackEmpty = false;
            console.log("[INFO] Push selected object to objectStack");
            console.log(this.objectStack);
            this.attributeKVPairsStack = [];
            this.elementKVPairsStack = [];
            if (this.selectedAttribute == undefined) {
                this.attributeKVPairsStack.push(this.nullAttributeKVPairs);
            } else {
                this.attributeKVPairsStack.push(Object.entries(this.selectedAttribute));
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

    isToppestObjectArray(): boolean {
        if (this.objectStack == undefined) {
            return false;
        }
        return this.isElementArray(this.objectStack[this.objectStack.length - 1]);
    }

    getNextElementModal(key: string, value: any): void {
        this.objectStack.push(value);
        // check if getAttribute() is a function indicating value is not an Array
        if (typeof value.getAttribute == "function" && value.getAttribute() != undefined) {
            this.attributeKVPairsStack.push(Object.entries(value.getAttribute()));
        } else {
            this.attributeKVPairsStack.push(null);
        }
        // check if getElement() is a function indicating value is not an Array
        // [NOTE] treat a Array member as an "element"
        if (typeof value.getElement == "function" && value.getElement() != undefined) {
            this.elementKVPairsStack.push(Object.entries(value.getElement()));
        } else if (this.isElementArray(value)) {
            this.elementKVPairsStack.push(Object.entries(value));
        } else {
            this.elementKVPairsStack.push(null);
        }

        console.log("[INFO] Editing the default element, show the default modal: ");
        console.log("1. objectStack= ");
        console.log(this.objectStack);
        console.log("2. attributeKVPairsStack = ")
        console.log(this.attributeKVPairsStack);
        console.log("3. elementKVPairsStack =")
        console.log(this.elementKVPairsStack);
    }

    backPreviousModal(): void {
        this.objectStack.pop();
        this.attributeKVPairsStack.pop();
        this.elementKVPairsStack.pop();

        console.log("[INFO] After pop the toppest object: ");
        console.log("1. objectStack= ");
        console.log(this.objectStack);
        console.log("2. attributeKVPairsStack = ")
        console.log(this.attributeKVPairsStack);
        console.log("3. elementKVPairsStack =")
        console.log(this.elementKVPairsStack);
    }

    close(): void {
        while (this.objectStack.length > 0) {
            this.objectStack.pop();
            this.attributeKVPairsStack.pop();
            this.elementKVPairsStack.pop();
        }
        console.log("[Close] clear objectSTack, attributeKVPairsStack, elementKVPairsStack");
    }

    pushArrayElement(): void {
        this.objectStack[this.objectStack.length - 2].getElement().push();
        this.elementKVPairsStack[this.elementKVPairsStack.length - 1] = Object.entries(this.objectStack[this.objectStack.length - 1]);
    }

    popArrayElement(): void {
        this.objectStack[this.objectStack.length - 2].getElement().pop();
        this.elementKVPairsStack[this.elementKVPairsStack.length - 1] = Object.entries(this.objectStack[this.objectStack.length - 1]);
    }

    sendUserSettedTargetContainerActivityEvent(): void {
        let vertexStorage = this.graphStorage.findVertexStorageByID(this.selectedVertex["id"]);
        let selectedComponent = vertexStorage.getComponent();
        this.userSettedTargetContainerActivity = selectedComponent;
        this.userSettedTargetContainerActivityEvent.emit(this.userSettedTargetContainerActivity);
    }

    // Scenario: import BPEL doc
    initBPELComponentDict(): void {
        // Containers
        this.bpelComponentDict.set("process", true);
        this.bpelComponentDict.set("scope", true);
        this.bpelComponentDict.set("validate", true);
        // Basic Activities
        this.bpelComponentDict.set("invoke", true);
        this.bpelComponentDict.set("receive", true);
        this.bpelComponentDict.set("reply", true);
        this.bpelComponentDict.set("assign", true);
        this.bpelComponentDict.set("copy", true);
        this.bpelComponentDict.set("throw", true);
        this.bpelComponentDict.set("wait", true);
        this.bpelComponentDict.set("empty", true);
        this.bpelComponentDict.set("exit", true);
        this.bpelComponentDict.set("rethrow", true);
        // Structured Activities
        this.bpelComponentDict.set("sequence", true);
        this.bpelComponentDict.set("flow", true);
        this.bpelComponentDict.set("if", true);
        this.bpelComponentDict.set("elseif", true);
        this.bpelComponentDict.set("else", true);
        this.bpelComponentDict.set("while", true);
        this.bpelComponentDict.set("repeatUntil", true);
        this.bpelComponentDict.set("forEach", true);
        this.bpelComponentDict.set("pick", true);
        this.bpelComponentDict.set("onMessage", true);
        // Others
        this.bpelComponentDict.set("compensate", true);
        this.bpelComponentDict.set("compensateScope", true);
    }

    extractNameOfComponentNameWithId(componentNameWithId: string): string {
        return componentNameWithId.split('_')[0];
    }

    extractIdOfComponentNameWithId(componentNameWithId: string): string {
        return componentNameWithId.split('_')[1];
    }
}