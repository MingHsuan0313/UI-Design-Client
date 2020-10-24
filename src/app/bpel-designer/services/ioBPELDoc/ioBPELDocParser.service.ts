import { GraphStorage } from "src/app/models/modelDependency";
import GraphEditorService from "src/app/services/graph-editor.service";

export class IOBPELDocParser {
    graphStorage: GraphStorage;
    curParentBPELNode: Element = null;

    constructor(private graphEditorService : GraphEditorService) {
    }

    parseImportBPELDoc(xmlBPELDoc: XMLDocument): void {
        let root = xmlBPELDoc.documentElement;
        this.dfsTraverseAndDraw(root);
        console.log("parser import done");
    }

    dfsTraverseAndDraw(rootNode: Element): void {
        //TODO: Use "rootNode.nodeName" to check whether it is a BPELComponent via PaletteComponent Dependency Injection
        console.log("===");
        console.log("parentNode = " + (this.curParentBPELNode != null? this.curParentBPELNode.nodeName : "null"));
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

        // recursively DFS traverse child nodes
        for (let i = 0; i < rootNode.children.length; i++) {
            // set curParentBPELNode first
            this.curParentBPELNode = rootNode;
            this.dfsTraverseAndDraw(rootNode.children.item(i));
        }

        // rescursion ends, so reset curParentBPELNode to rootNode's parent
        if (rootNode.parentElement != null) {
            this.curParentBPELNode = rootNode.parentElement;
        }
    }

    parseExportBPELDoc(): XMLDocument {
        //TODO:
        console.log("pasert export done");
        return null;
    }
}