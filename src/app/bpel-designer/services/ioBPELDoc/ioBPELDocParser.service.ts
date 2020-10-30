import { GraphStorage } from "src/app/models/graph-dependency";
import GraphEditorService from "src/app/services/externalRepresentation/graph-editor.service";
import IOBPELDocService from "./ioBPELDoc.service";

const enum Tag {
    PROCESS = "process",
    ATTRIBUTE = "attribute",
    ELEMENT = "element",
    ACTIVITY = "activity",
    LIST = "List",
    ACTIVITY_LIST = "activityList",
    COMPONENT_NAME = "componentName"
}

export class IOBPELDocParser {
    graphStorage: GraphStorage;
    curParentBPELNode: Element = null;
    componentNameWithIdStack: string[] = new Array<string>();
    componentNameWithIdAttributesMap: Map<string, Map<string, string>> = new Map<string, Map<string, string>>();
    componentNameWithIdElementTextContentMap: Map<string, string> = new Map<string, string>();
    idCnt: number = 2;  // consistent with mxGraph Id
    componentIdMap: Map<Element, string> = new Map<Element, string>();

    constructor(private ioBPELDocService: IOBPELDocService, private graphEditorService : GraphEditorService) {
    }

    parseImportBPELDoc(xmlBPELDoc: XMLDocument): void {
        let root = xmlBPELDoc.documentElement;
        this.dfsTraverseAndDraw(root);
        alert("parser import done");
    }

    dfsTraverseAndDraw(rootNode: Element): void {
        // keep every node's id record
        if (rootNode && !this.componentIdMap.get(rootNode)) {
            let id = String(this.idCnt);
            this.componentIdMap.set(rootNode, id);
            this.componentNameWithIdStack.push(rootNode.nodeName + "_" + id)
            console.log("rootNode.name = " + rootNode.nodeName + ", idCnt = " + this.idCnt);
            this.idCnt += 1;
        }

        // show current DFS Traverse Info
        console.log("============ Current DFS Traverse Info BEGIN ============");
        console.log("parentNode = " + (this.curParentBPELNode != null? this.curParentBPELNode.nodeName + "_" + this.componentIdMap.get(this.curParentBPELNode) : "null"));
        let componentNameWithId = rootNode.nodeName + "_" + this.componentIdMap.get(rootNode);
        console.log("curNode= " + componentNameWithId);
        // 1. attribute key and value
        let curNodeAttributeNames = rootNode.getAttributeNames();
        if (curNodeAttributeNames.length) {
            let attributesMap = new Map<string, string>();
            console.log("*** attributes=");
            for (let i = 0; i < curNodeAttributeNames.length; i++) {
                let k = curNodeAttributeNames[i];
                let v = rootNode.getAttribute(curNodeAttributeNames[i]);
                attributesMap.set(k, v);
                console.log(k + "=" + v)
            }
            this.componentNameWithIdAttributesMap.set(componentNameWithId, attributesMap);
        }
        // 2. text content, e.g. <literal>, <condition>...
        if (rootNode.childNodes.length == 1 && rootNode.childNodes[0].nodeValue) {
            let textContent = rootNode.childNodes[0].nodeValue;
            console.log("*** textContent=");
            console.log(textContent);
            this.componentNameWithIdElementTextContentMap.set(componentNameWithId, textContent);
        }
        console.log("============ Current DFS Traverse Info END ============");

        // notify current componentNameWithIdStack to PaletteComponent TODO: Setting attributes and elements in PropertyEditorComponent
        if (!this.curParentBPELNode) {
            this.ioBPELDocService.next(this.componentNameWithIdStack,
                                        undefined,
                                        this.componentNameWithIdAttributesMap.get(componentNameWithId),
                                        this.componentNameWithIdElementTextContentMap.get(componentNameWithId));
        } else {
            this.ioBPELDocService.next(this.componentNameWithIdStack,
                                        this.curParentBPELNode.nodeName + "_" + this.componentIdMap.get(this.curParentBPELNode),
                                        this.componentNameWithIdAttributesMap.get(componentNameWithId),
                                        this.componentNameWithIdElementTextContentMap.get(componentNameWithId));
        }

        // recursively DFS traverse child nodes
        for (let i = 0; i < rootNode.children.length; i++) {
            // set curParentBPELNode first
            this.curParentBPELNode = rootNode;
            this.dfsTraverseAndDraw(rootNode.children.item(i));
        }

        // rescursion ends, so reset curParentBPELNode to rootNode's parent
        if (rootNode.parentElement != null) {
            this.curParentBPELNode = rootNode.parentElement;
            this.componentNameWithIdStack.pop();
        }
    }

    parseExportBPELDoc(): Element {
        this.graphStorage = this.graphEditorService.getGraphStorage();
        let processBPELComponent = this.graphStorage.findVertexStorageByID(2).getComponent();
        console.log(processBPELComponent);

        // discard "updateBPELDocService" to avoid circular structure to JSON
        // sort the properties by their keys in descending order to let activity & activityList begin last key
        function replacer(key: string, value: any) {
            let UPDATE_BPEL_DOC_SERVICE = "updateBPELDocService";
            let FILTER_FIELDS = ["id", "x", "y", "width", "height", "provideFrom", "provideTo"];
            if (key != UPDATE_BPEL_DOC_SERVICE && !FILTER_FIELDS.includes(key)) {
                return value instanceof Object && !(value instanceof Array) ?
                Object.keys(value).sort().reverse().reduce((sorted, key) => {
                    sorted[key] = value[key];
                    return sorted;
                }, {}):
                value;
            }
        }

        let processIRObj = JSON.parse(JSON.stringify(processBPELComponent, replacer));
        console.log(processIRObj);
        // create a new XML-based BPEL Doc
        let retBPELDoc = this.dfsInternalRepresentationJSONAndCreateNode(Tag.PROCESS, processIRObj, document.createElement(Tag.PROCESS));
        console.log("[return BPEL Doc]");
        console.log(retBPELDoc);

        alert("parser export done");
        return retBPELDoc;
    }

    dfsInternalRepresentationJSONAndCreateNode(curJSONKey: string, curJSONValue: any, rootNode: Element): Element {
        if (curJSONKey == Tag.PROCESS) {
            console.log("[0.curJSONValue is the INITIAL_PROCESS's value");
            this.setNodeAttributes(curJSONValue[Tag.ATTRIBUTE], rootNode)
            rootNode = this.dfsInternalRepresentationJSONAndCreateNode(null, curJSONValue, rootNode);
        } else {
            let curJSONValueOwnsKeys = Object.keys(curJSONValue);
            for (let trackingKey of curJSONValueOwnsKeys) {
                /* DEBUG INFO */
                console.log("================== dfsInternalRepresentationJSONAndCreateNode INFO BEGIN ==================");
                console.log("* curJSONKey =");
                console.log(curJSONKey);
                console.log("* curJSONValue =");
                console.log(curJSONValue);
                console.log("* All keys of curJSONValue=");
                console.log(curJSONValueOwnsKeys);
                console.log("* tracking key of all keys of curJSONValue =");
                console.log(trackingKey);
                console.log("================== dfsInternalRepresentationJSONAndCreateNode INFO END ==================");
                /* DEBUG INFO */
                if (trackingKey == Tag.ATTRIBUTE || trackingKey == Tag.COMPONENT_NAME)
                    continue;
                if (curJSONKey == Tag.ELEMENT) {
                    console.log("[1.curJSONKey == element]");
                    // curJSONValue is the "element"'s textContent node
                    if (curJSONValueOwnsKeys.length == 1 && !Array.isArray(curJSONValue[curJSONValueOwnsKeys[0]]) &&
                    curJSONValue[curJSONValueOwnsKeys[0]] != null && this.isPlainString(curJSONValue[curJSONValueOwnsKeys[0]])) {
                        console.log("[1-1.curJSONValue == element-textContent]")
                        let textContent = curJSONValue[curJSONValueOwnsKeys[0]];
                        if (textContent != "") {
                            let childNode = document.createTextNode(textContent);
                            rootNode.appendChild(childNode);
                            console.log("@@ append textNode value = " + childNode.nodeValue + " to rootNodeName = " + rootNode.nodeName);
                        }
                    } else {
                        console.log("[1-2.curJSONValue == specific signature List (e.g. \"variableList\") or specific signature (e.g. \"variables\", \"activity\", \"activityList\")")
                        if (curJSONValue[trackingKey] != null) {
                            if (trackingKey == Tag.ACTIVITY || trackingKey == Tag.ACTIVITY_LIST || trackingKey.includes(Tag.LIST))
                                rootNode = this.dfsInternalRepresentationJSONAndCreateNode(trackingKey, curJSONValue[trackingKey], rootNode);
                            else {
                                let childNode = document.createElement(trackingKey);
                                this.setNodeAttributes(curJSONValue[trackingKey][Tag.ATTRIBUTE], childNode);
                                let dfsResult = this.dfsInternalRepresentationJSONAndCreateNode(trackingKey, curJSONValue[trackingKey], childNode);
                                rootNode.appendChild(dfsResult);
                                console.log("@@ append nodeName = " + dfsResult.nodeName + " to rootNodeName = " + rootNode.nodeName);
                            }
                        }
                    }
                } else {
                    console.log("[2.curJSONKey != element]");
                    if (Array.isArray(curJSONValue)) {
                        console.log("[2-1.curJSONValue == array]");
                        if (curJSONKey == Tag.ACTIVITY_LIST) {
                            console.log("[2-1-1.curJSONKey == activityList]");
                            rootNode = this.dfsInternalRepresentationJSONAndCreateNode(Tag.ACTIVITY, curJSONValue[trackingKey], rootNode);
                        } else {
                            console.log("[2-1-2.curJSONKey == signature List]");
                            let childNode = document.createElement(this.eraseStringListSuffix(curJSONKey));
                            this.setNodeAttributes(curJSONValue[trackingKey][Tag.ATTRIBUTE], childNode);
                            // TODO: check array give next curJSONKey=null is OK?
                            let dfsResult = this.dfsInternalRepresentationJSONAndCreateNode(null, curJSONValue[trackingKey], childNode);
                            rootNode.appendChild(dfsResult);
                            console.log("@@ append nodeName = " + dfsResult.nodeName + " to rootNodeName = " + rootNode.nodeName);
                        }
                    } else {
                        console.log("[2-2.curJSONValue != array]");
                        if (curJSONKey == Tag.ACTIVITY) {
                            console.log("[2-2-1.curJSONValue is a activity (e.g. <copy>)");
                            let childNode = document.createElement(curJSONValue[Tag.COMPONENT_NAME]);
                            this.setNodeAttributes(curJSONValue[Tag.ATTRIBUTE], childNode)
                            let dfsResult = this.dfsInternalRepresentationJSONAndCreateNode(trackingKey, curJSONValue[trackingKey], childNode);
                            rootNode.appendChild(dfsResult);
                            console.log("@@ append nodeName = " + dfsResult.nodeName + " to rootNodeName = " + rootNode.nodeName);
                        } else {
                            console.log("[2-2-2.curJSONValue is INITIAL_PROCESS_VALUE or a specific signature (e.g. <variable>)");
                            rootNode = this.dfsInternalRepresentationJSONAndCreateNode(trackingKey, curJSONValue[trackingKey], rootNode);
                        }
                    }
                }
            }
        }
        console.log(" ******* Return BEGIN *********");
        console.log("* return rootNode =");
        console.log(rootNode);
        console.log(" ******* Return END *********");
        return rootNode;
    }

    private setNodeAttributes(attributesKVParis: string, node: any): void {
        //TODO: handle <process> "abstractprocesseslist"
        console.log("attributesKVPairs=");
        console.log(attributesKVParis);
        // has attributes
        if (attributesKVParis != undefined) {
            for (let key of Object.keys(attributesKVParis)) {
                // if an attribute value is not empty
                if (attributesKVParis[key] != "")
                    node.setAttribute(key, attributesKVParis[key]);
            }
        }
    }

    private eraseStringListSuffix(str: string): string {
        return str.replace(Tag.LIST, "");
    }

    private isPlainString(value: any): boolean {
        value = (typeof value != "string")? JSON.stringify(value): value;
        return value[0] != "{";
    }
}