import { GraphStorage } from "src/app/models/modelDependency";
import GraphEditorService from "src/app/services/graph-editor.service";
import IOBPELDocService from "./ioBPELDoc.service";

export class IOBPELDocParser {
    graphStorage: GraphStorage;
    curParentBPELNode: Element = null;
    componentNameWithIdStack: string[] = new Array<string>();
    idCnt: number = 2;  // consistent with mxGraph Id
    componentIdMap: Map<Element, string> = new Map<Element, string>();

    constructor(private ioBPELDocService: IOBPELDocService, private graphEditorService : GraphEditorService) {
    }

    parseImportBPELDoc(xmlBPELDoc: XMLDocument): void {
        let root = xmlBPELDoc.documentElement;
        this.dfsTraverseAndDraw(root);
        console.log("parser import done");
    }

    dfsTraverseAndDraw(rootNode: Element): void {
        console.log("============ Current DFS Traverse Info BEGIN ============");
        console.log("parentNode = " + (this.curParentBPELNode != null? this.curParentBPELNode.nodeName + "_" + this.componentIdMap.get(this.curParentBPELNode) : "null"));
        console.log("curNode= " + rootNode.nodeName);
        // 1. attribute key and value
        let curNodeAttributeNames = rootNode.getAttributeNames();
        if (curNodeAttributeNames.length) {
            console.log("*** attributes=");
            for (let i = 0; i < curNodeAttributeNames.length; i++) {
                console.log(curNodeAttributeNames[i] + "=" + rootNode.getAttribute(curNodeAttributeNames[i]))
            }
        }
        // 2. text content, e.g. <literal>, <condition>...
        if (rootNode.childNodes.length == 1 && rootNode.childNodes[0].nodeValue) {
            console.log("*** textContent=");
            console.log(rootNode.childNodes[0].nodeValue);
        }
        console.log("============ Current DFS Traverse Info END ============");

        // keep every node's id record
        if (rootNode && !this.componentIdMap.get(rootNode)) {
            let id = String(this.idCnt);
            this.componentIdMap.set(rootNode, id);
            this.componentNameWithIdStack.push(rootNode.nodeName + "_" + id)
            this.idCnt += 1;
        }
        // notify current componentNameWithIdStack to PaletteComponent TODO: Setting attributes and elements in PropertyEditorComponent
        if (!this.curParentBPELNode) {
            this.ioBPELDocService.next(this.componentNameWithIdStack, undefined);
        } else {
            this.ioBPELDocService.next(this.componentNameWithIdStack, this.curParentBPELNode.nodeName + "_" + this.componentIdMap.get(this.curParentBPELNode));
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

    parseExportBPELDoc(): XMLDocument {
        //TODO:
        console.log("pasert export done");
        return null;
    }
}