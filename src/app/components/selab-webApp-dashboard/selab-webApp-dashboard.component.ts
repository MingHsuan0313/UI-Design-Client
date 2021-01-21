import { Component, OnDestroy, OnInit } from "@angular/core";
import { SelabGlobalStorage } from "../../models/store/globalStorage";
import WebAppGeneratingService from "src/app/services/webAppGenerating/webApp-generating.service";
import { timer } from "rxjs";
import { takeUntil, takeWhile } from "rxjs/operators";

@Component({
    selector: 'selab-webApp-dashboard',
    templateUrl: './selab-webApp-dashboard.component.html',
    styleUrls: ['./selab-webApp-dashboard.component.scss']
})
export class SelabWebAppDashboardComponent implements OnInit {

    stages: any[] = [];
    taskStatus: string;
    deployedUrl: string;

    constructor(private webAppGeneratingService: WebAppGeneratingService) {}

    ngOnInit(): void {}

    generateWebApp(): void {
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
                                    getWebAppGeneratingStateSubscription.unsubscribe();
                                }
                                if (webAppGeneratingState["isTimeout"] == true) {
                                    getWebAppGeneratingStateSubscription.unsubscribe();
                                }
                                if (webAppGeneratingState["deployedUrl"] != null) {
                                    this.deployedUrl = webAppGeneratingState["deployedUrl"];
                                    alert("Congradulation! You just generate the Web Application you have drawn.");
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

    isStageSuccess(stage: any): boolean {
        return stage["status"] == "SUCCESS";
    }

    isStageInProgress(stage: any): boolean {
        return stage["status"] == "IN_PROGRESS";
    }

    isStageFailed(stage: any): boolean {
        return stage["status"] == "FAILED";
    }
}