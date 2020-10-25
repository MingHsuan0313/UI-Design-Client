import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import GraphEditorService from "src/app/services/graph-editor.service";
import { IOBPELDocParser } from "./ioBPELDocParser.service";
import { IOBPELDocValidator } from "./ioBPELDocValidator.service";

@Injectable ({
    providedIn: "root"
})
export default class IOBPELDocService {
    ioBPELDocValidator: IOBPELDocValidator;
    ioBPELDocParser: IOBPELDocParser;
    componentNameWithIdStack_CurParentNodeNameWithIdSource = new Subject<[string[], string]>();
    componentNameWithIdStack_CurParentNodeNameWithIdObservable: Observable<[string[], string]> = this.componentNameWithIdStack_CurParentNodeNameWithIdSource.asObservable();

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

    next(componentNameWithIdStack: string[], curParentNodeNameWithId: string): void {
        this.componentNameWithIdStack_CurParentNodeNameWithIdSource.next([componentNameWithIdStack, curParentNodeNameWithId]);
    }

    subscribe(observer: any) {
        return this.componentNameWithIdStack_CurParentNodeNameWithIdObservable.subscribe(observer);
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

    downloadXMLToClientSide(xml: XMLDocument, filename: string): void {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.setAttribute("style", "display: none");

        var blob = new Blob([new XMLSerializer().serializeToString(xml.documentElement)], {type: "text/xml;"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);

    }
}