import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import GraphEditorService from "src/app/services/externalRepresentation/graph-editor.service";
import { IOBPELDocParser } from "./ioBPELDocParser.service";
import { IOBPELDocValidator } from "./ioBPELDocValidator.service";

@Injectable ({
    providedIn: "root"
})
export default class IOBPELDocService {
    ioBPELDocValidator: IOBPELDocValidator;
    ioBPELDocParser: IOBPELDocParser;
    componentNameWithIdStack_curParentNodeNameWithId_curNodeAttributesMap_curNodeElementTextContentSource = new Subject<[string[], string, Map<string, string>, string]>();

    constructor(private graphEditorService : GraphEditorService) {
        this.ioBPELDocValidator = new IOBPELDocValidator(graphEditorService);
        this.ioBPELDocParser = new IOBPELDocParser(this, graphEditorService);
    }

    importBPELDoc(event: any): void {
        // Read file as text
        let selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(new Blob([selectedFile]));
        reader.onload = () => {
            // parse to XML
            const parser = new DOMParser();
            let xmlBPELDoc = parser.parseFromString(reader.result, "text/xml");
            console.log(xmlBPELDoc);
            if (xmlBPELDoc.getElementsByTagName("parsererror").length) {
                let XML_CONTEXT_FORMAT_ERROR_MSG = "The importing BPEL doc has XML context format error";
                alert(XML_CONTEXT_FORMAT_ERROR_MSG);
                throw new Error(XML_CONTEXT_FORMAT_ERROR_MSG);
            }

            if (this.ioBPELDocValidator.isImportBPELDocValid(xmlBPELDoc)) {
                this.ioBPELDocParser.parseImportBPELDoc(xmlBPELDoc);
            } else {
                let INVALID_BPEL_DOC_MSG = "The importing BPEL doc is invalid";
                alert(INVALID_BPEL_DOC_MSG);
                throw new Error(INVALID_BPEL_DOC_MSG);
            }
        };
    }

    next(componentNameWithIdStack: string[], curParentNodeNameWithId: string, curNodeAttributesMap: Map<string, string>, curNodeElementTextContent: string): void {
        console.log("[Subject.Next: componentNameWithIdStack]")
        console.log(componentNameWithIdStack);
        console.log("[Subject.Next: curParentNodeNameWithId]")
        console.log(curParentNodeNameWithId);
        console.log("[Subject.Next: curNodeAttributesMap]")
        console.log(curNodeAttributesMap);
        console.log("[Subject.Next: curNodeElementTextContent]")
        console.log(curNodeElementTextContent);
        this.componentNameWithIdStack_curParentNodeNameWithId_curNodeAttributesMap_curNodeElementTextContentSource.next([componentNameWithIdStack, curParentNodeNameWithId, curNodeAttributesMap, curNodeElementTextContent]);
    }

    subscribe(observer: any) {
        return this.componentNameWithIdStack_curParentNodeNameWithId_curNodeAttributesMap_curNodeElementTextContentSource.subscribe(observer);
    }

    exportBPELDoc(bpelDocFilename: string): void {
        if (this.ioBPELDocValidator.isExportBPELDocValid()) {
            let xmlBPELDoc = this.ioBPELDocParser.parseExportBPELDoc();
            this.downloadXMLToClientSide(xmlBPELDoc, bpelDocFilename);
        } else {
            let INVALID_BPEL_DOC_MSG = "The exporting BPEL doc is invalid";
            alert(INVALID_BPEL_DOC_MSG);
            throw new Error(INVALID_BPEL_DOC_MSG);
        }
    }

    downloadXMLToClientSide(xml: Element, filename: string): void {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.setAttribute("style", "display: none");

        var blob = new Blob([new XMLSerializer().serializeToString(xml)], {type: "text/xml;"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        alert(filename + " has been downloaded!");
    }
}