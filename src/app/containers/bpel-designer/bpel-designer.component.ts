import { Component, OnInit } from "@angular/core";
import IOBPELDocService from "src/app/bpel-designer/services/ioBPELDoc/ioBPELDoc.service";

@Component({
    selector: 'bpel-dashboard',
    templateUrl: './bpel-designer.component.html',
    styleUrls: ['./bpel-designer.compnent.scss']
})
export class BPELDesignerComponent implements OnInit {
    targetContainerActivity: string;
    isImporting: boolean;
    isExporting: boolean;

    ngOnInit(): void {
    }

    constructor(private ioBPELDocService: IOBPELDocService) {
    }

    receiveTargetContainerActivity(event: any): void {
        this.targetContainerActivity = event;
    }

    importBPELDoc(event: any): void {
        this.ioBPELDocService.importBPELDoc(event);
    }

    exportBPELDoc(bpelDocFilename: string): void {
        this.ioBPELDocService.exportBPELDoc(bpelDocFilename);
    }

}