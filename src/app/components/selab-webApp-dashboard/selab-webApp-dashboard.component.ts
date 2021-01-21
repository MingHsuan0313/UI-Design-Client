import { Component, OnInit } from "@angular/core";
import { SelabGlobalStorage } from "../../models/store/globalStorage";
import WebAppGeneratingService from "src/app/services/webAppGenerating/webApp-generating.service";
import { timer } from "rxjs";
import { ConfirmDialogComponent, ConfirmDialogModel } from "../utils/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material";

@Component({
    selector: 'selab-webApp-dashboard',
    templateUrl: './selab-webApp-dashboard.component.html',
    styleUrls: ['./selab-webApp-dashboard.component.scss']
})
export class SelabWebAppDashboardComponent implements OnInit {

    stages: any[] = [];
    taskStatus: string;
    deployedUrl: string;
    isGenerating: boolean = false;

    constructor(private webAppGeneratingService: WebAppGeneratingService,
        private dialog: MatDialog) {}

    ngOnInit(): void {}

    confirmGenerate() {
        const message = `It will trigger WebApp generating DevOps.`;
        const dialogData = new ConfirmDialogModel("Confirm to generate you Web Application?", message);

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          maxWidth: "500px",
          data: dialogData

        });

        dialogRef.afterClosed().subscribe(dialogResult => {
          if (dialogResult == true) {
            this.generateWebApp();
          }
        });
    }

    generateWebApp(): void {
        this.stages = [];
        this.taskStatus = undefined;
        this.deployedUrl = undefined;
        this.isGenerating = true;

        let projectName: string = SelabGlobalStorage.projectName;
        let instanceId: string;
        enum BUILD_FAILED_STATUS {
            FAILED,
            ABORTED
        }

        this.webAppGeneratingService.triggerJenkinsGenerateWebApp(projectName).subscribe(
            response => {
                instanceId = response["body"];  // Plain string response body
                console.log(`Jenkins queue item instanceId=${instanceId}`);
                // polling to get current status until the build ends
                let getWebAppGeneratingStateSubscription = timer(1, 1000).subscribe(
                    () => {
                        this.webAppGeneratingService.getCurrentStatus(instanceId).subscribe(
                            response => {
                                let webAppGeneratingState = JSON.parse(response["body"]);   // JSON Object response body
                                this.stages = JSON.parse(webAppGeneratingState["stages"]);
                                this.taskStatus = webAppGeneratingState["taskStatus"];

                                if (webAppGeneratingState["taskStatus"] in BUILD_FAILED_STATUS) {
                                    this.isGenerating = false;
                                    getWebAppGeneratingStateSubscription.unsubscribe();
                                }
                                if (webAppGeneratingState["isTimeout"] == true) {
                                    this.isGenerating = false;
                                    getWebAppGeneratingStateSubscription.unsubscribe();
                                }
                                if (webAppGeneratingState["deployedUrl"] != null) {
                                    this.isGenerating = false;
                                    this.deployedUrl = webAppGeneratingState["deployedUrl"];
                                    alert("Congradulation! You just generated the Web Application you have drawn.");
                                    getWebAppGeneratingStateSubscription.unsubscribe();
                                }
                            }
                        )
                    }
                );
            }
        )
    }

    getProjectName(): string {
        return SelabGlobalStorage.projectName;
    }

    getStageName(stage: any): string {
        return stage["name"];
    }

    getStageDurationSeconds(stage: any): number {
        return stage["durationMillis"] / 1000;
    }

    isStageSuccess(stage: any): boolean {
        return stage["status"] == "SUCCESS";
    }

    isStageInProgress(stage: any): boolean {
        return stage["status"] == "IN_PROGRESS";
    }

    isStageFailed(stage: any): boolean {
        return stage["status"] == "FAILED";
    }

    isTaskStatusSuccess(): boolean {
        return this.taskStatus == "SUCCESS";
    }

    isTaskStatusInProgress(): boolean {
        return this.taskStatus == "IN_PROGRESS";
    }

    isTaskStatusFailed(): boolean {
        return this.taskStatus == "FAILED" || this.taskStatus == "ABORTED";
    }

    isTaskStatusOther(): boolean {
        return !this.isTaskStatusSuccess() && !this.isTaskStatusInProgress && !this.isTaskStatusFailed();
    }
}