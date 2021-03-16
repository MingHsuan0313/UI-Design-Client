import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { BpelDesignerEditorService } from "src/app/bpel-designer/services/bpel-designer-editor.service";
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

    constructor(private ioBPELDocService: IOBPELDocService,
        private bpelDesginerEditorService: BpelDesignerEditorService,
        private snackBar: MatSnackBar
    ) {
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

    /***************************** Helper *****************************/
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
          verticalPosition: "top"
        })
    }

    showInternalRepresentation() {
        let processBPELComponent = this.bpelDesginerEditorService.getGraphStorage().findVertexStorageByID(2).getComponent();
        console.log(processBPELComponent);
        this.openSnackBar("show IR of root <process> component in console", "display");
    }

    showExternalRepresentation() {
        console.log(this.bpelDesginerEditorService.getGraphStorage());
        this.openSnackBar("show ER(graphStorage) in console", "display");
    }

    zoomIn() {
        this.bpelDesginerEditorService.zoomIn();
    }

    zoomOut() {
        this.bpelDesginerEditorService.zoomOut();
    }
    /***************************** Helper *****************************/
}