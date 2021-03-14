import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { BPELComponent } from "../../models/components/BPELComponent.model";
import { GraphStorage } from "../../models/graph-storage.model";
import { BpelDesignerEditorService } from "../../services/bpel-designer-editor.service";
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

    constructor(private graphEditorService: BpelDesignerEditorService, private ioBPELDocService: IOBPELDocService) {
        this.initBPELComponentDict();

        ioBPELDocService.subscribe((componentNameWithIdStack_curParentNodeNameWithId_curNodeAttributesMap_curNodeElementTextContent: [string[], string, Map<string, string>, string]) => {
            console.log("============ Subscribed: PropertyEditorComponent.getNextElementModal(), sync() BEGIN ============");

            let componentNameWithIdStack = componentNameWithIdStack_curParentNodeNameWithId_curNodeAttributesMap_curNodeElementTextContent[0];
            let curParentNodeNameWithId = componentNameWithIdStack_curParentNodeNameWithId_curNodeAttributesMap_curNodeElementTextContent[1];
            let curNodeAttributesMap = componentNameWithIdStack_curParentNodeNameWithId_curNodeAttributesMap_curNodeElementTextContent[2];
            let curNodeElementTextContent = componentNameWithIdStack_curParentNodeNameWithId_curNodeAttributesMap_curNodeElementTextContent[3];

            if (componentNameWithIdStack.length) {
                let lastNodeIdx = componentNameWithIdStack.length - 1;
                let lastNodeNameWithId = componentNameWithIdStack[lastNodeIdx];
                let lastNodeName = this.extractNameOfComponentNameWithId(lastNodeNameWithId);
                let lastNodeId = this.extractIdOfComponentNameWithId(lastNodeNameWithId);

                if (curParentNodeNameWithId != undefined) {
                    console.log("[curParentNodeNameWithId] = " + curParentNodeNameWithId);
                    // not belong to BPELComponent
                    if (!this.bpelComponentDict.get(lastNodeName)) {
                        // variables has no id on graphStorage
                        // idx-- to backtracking to find nearestBPELComponentParentIdx
                        // e.g. process <- "sequence" <- sources <- source
                        let curParentIdx = componentNameWithIdStack.indexOf(curParentNodeNameWithId);
                        let nearestBPELComponentParentIdx = curParentIdx;
                        let nearestBPELComponentParentVertexId;
                        while (true) {
                            let componentNameWithId = componentNameWithIdStack[nearestBPELComponentParentIdx];
                            let componentName = this.extractNameOfComponentNameWithId(componentNameWithId);
                            nearestBPELComponentParentVertexId = this.extractIdOfComponentNameWithId(componentNameWithId);
                            if (this.bpelComponentDict.get(componentName))
                                break;
                            nearestBPELComponentParentIdx -= 1;
                        }
                        let editingNode = this.graphStorage.findVertexStorageByID(nearestBPELComponentParentVertexId).getComponent();
                        console.log("From nearestBPELComponentIdx = " + nearestBPELComponentParentIdx + " to push objectStack, curParentIdx = " + curParentIdx + " lastNodeIdx = " + lastNodeIdx);
                        for (let i = nearestBPELComponentParentIdx; i <= lastNodeIdx; i++) {
                            console.log("editingNode =");
                            console.log(editingNode);

                            this.getNextElementModal("", editingNode);
                            if (i != lastNodeIdx) {
                                console.log("i = " + i + " lastNodeIdx = " + lastNodeIdx);
                                let childElementName = this.extractNameOfComponentNameWithId(componentNameWithIdStack[i + 1]);
                                let isEditingNodeChanged = false;
                                this.elementKVPairsStack[this.elementKVPairsStack.length - 1].forEach(([key, value]: [string, any]) => {
                                    if (key == childElementName) {
                                        editingNode = value;
                                        isEditingNodeChanged = true;
                                    }
                                });
                                // childElementName belongs to editingNode's "<ELEMENT_NAME>List" array element
                                if (!isEditingNodeChanged) {
                                    // naming convention: "<ELEMENT_NAME>List"
                                    let LIST_SUFFIX = "List"
                                    this.elementKVPairsStack[this.elementKVPairsStack.length - 1].forEach(([key, value]: [string, any]) => {
                                        if (key == childElementName + LIST_SUFFIX) {
                                            editingNode = value;
                                            isEditingNodeChanged = true;
                                        }
                                    });
                                }
                                console.log("changed editingNode =");
                                console.log(editingNode);
                            } else {
                                if (this.isElementString(editingNode)) {
                                    console.log("[IS_EDITINGNODE_STRING]");
                                } else if (this.isElementArray(editingNode)) {
                                    console.log("[IS_IS_EDITINGNODE_ARRAY, elementKVPairsStack=]");
                                    this.pushArrayElement();
                                    this.getNextElementModal("", editingNode[editingNode.length - 1]);
                                    console.log(this.elementKVPairsStack);
                                }
                                // sync all attributes, element textContent for current objectStack[-1]
                                this.setAttributesForImportingCurNode(curNodeAttributesMap);
                                this.setElemenetTextContentForImportingCurNode(curNodeElementTextContent);
                            }
                        }
                        this.close();
                    } else {
                        let bpelComponent = this.graphStorage.findVertexStorageByID(lastNodeId).getComponent();
                        this.getNextElementModal("", bpelComponent);
                        // sync all attributes, element textContent for current objectStack[-1]
                        this.setAttributesForImportingCurNode(curNodeAttributesMap);
                        this.setElemenetTextContentForImportingCurNode(curNodeElementTextContent);
                        this.close();
                    }
                } else {
                    // BPEL Doc first node is <process> id=2 (supposed to be consistent with mxGraph)
                    this.getNextElementModal("", this.graphStorage.findVertexStorageByID(2).getComponent());
                    let abstractProcessesList = "";
                    // sync all attributes for current objectStack[-1]
                    if (curNodeAttributesMap != undefined) {
                        curNodeAttributesMap.forEach((value: string, key: string, map: Map<string, string>) => {
                            // abstractProcessesList
                            if (key.startsWith("xmlns")) {
                                abstractProcessesList += (key + "=" + "\"" + value + "\" ");
                                let newEventTargetValue = { "target": { "value": abstractProcessesList } };
                                this.syncSelectedAttribute("abstractProcessesList", newEventTargetValue);
                            } else {
                                let newEventTargetValue = { "target": { "value": value } };
                                this.syncSelectedAttribute(key, newEventTargetValue);
                            }
                        });
                    }
                    this.close();
                }
            }
            console.log("============ Subscribed: PropertyEditorComponent.getNextElementModal(), sync() END ============");
        });
    }

    ngOnInit() {
        setTimeout(() => {
            this.graphStorage = this.graphEditorService.getGraphStorage();
            console.log('hello world')
            console.log(this.graphStorage)
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

        }, 300);
    }

    getKey(kv) {
        return kv[0];
    }

    getValue(kv) {
        return kv[1];
    }

    syncSelectedAttribute(attributeKey: any, event: any) {
        let toppestObject = this.objectStack[this.objectStack.length - 1];
        console.log("[INFO] the toppest object = ");
        console.log(toppestObject);
        console.log("Editing attribute field = " + attributeKey);
        toppestObject.getAttribute()[attributeKey] = event.target.value;
        console.log("Editing attribute setting value = " + toppestObject.getAttribute()[attributeKey]);

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
        let toppestObject = this.objectStack[this.objectStack.length - 1];
        console.log("[INFO] the toppest object = ");
        console.log(toppestObject);
        let textContentKey = elementKey;
        if (elementKey == null)
            textContentKey = Object.keys(toppestObject.getElement())[0];
        console.log("Editing element field = " + textContentKey);
        toppestObject.getElement()[textContentKey] = event.target.value;
        console.log("Editing element setting textContent value = " + toppestObject.getElement()[textContentKey]);
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

    private extractNameOfComponentNameWithId(componentNameWithId: string): string {
        return componentNameWithId.split('_')[0];
    }

    private extractIdOfComponentNameWithId(componentNameWithId: string): string {
        return componentNameWithId.split('_')[1];
    }

    private setAttributesForImportingCurNode(curNodeAttributesMap: Map<string, string>) {
        if (curNodeAttributesMap != undefined) {
            curNodeAttributesMap.forEach((value: string, key: string, map: Map<string, string>) => {
                let newEventTargetValue = { "target": { "value": value } };
                this.syncSelectedAttribute(key, newEventTargetValue);
            });
        }
    }

    private setElemenetTextContentForImportingCurNode(curNodeElementTextContent: string) {
        if (curNodeElementTextContent != undefined) {
            let newEventTargetValue = { "target": { "value": curNodeElementTextContent } };
            this.syncSelectedElement(null, newEventTargetValue);
        }
    }
}