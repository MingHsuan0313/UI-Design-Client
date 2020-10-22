import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'bpel-dashboard',
    templateUrl: './bpel-designer.component.html',
    styleUrls: ['./bpel-designer.compnent.scss']
})
export class BPELDesignerComponent implements OnInit {
    targetContainerActivity: string;

    ngOnInit(): void {
    }

    receiveTargetContainerActivity(event: any): void {
        this.targetContainerActivity = event;
    }

}