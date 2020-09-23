import { AfterViewInit, Component } from "@angular/core";
import { GraphStorage } from "src/app/models/modelDependency";
import GraphEditorService from "src/app/services/graph-editor.service";
import { PropertyGenerator } from "src/app/shared/property-generator";
import { ICreateBPELComponentStrategy } from "../../models/createBPELComponentStrategy/ICreateBPELComponentStrategy";
import { Process } from "../../models/components/component/containers/process.model";
import { ProcessStrategy } from "../../models/createBPELComponentStrategy/ProcessStrategy";
import { Invoke } from "../../models/components/component/basic-activities/invoke.model";
import { InvokeStrategy } from "../../models/createBPELComponentStrategy/InvokeStrategy";
import { Receive } from "../../models/components/component/basic-activities/receive.model";
import { ReceiveStrategy } from "../../models/createBPELComponentStrategy/ReceiveStrategy";
import { Reply } from "../../models/components/component/basic-activities/reply.model";
import { ReplyStrategy } from "../../models/createBPELComponentStrategy/ReplyStrategy";

@Component({
    selector: 'palette',
    templateUrl: './palette.component.html',
    styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements AfterViewInit {
    graphStorage: GraphStorage;
    strategy: ICreateBPELComponentStrategy;

    constructor(private graphEditorService: GraphEditorService) {
    }

    ngAfterViewInit(): void {
        this.graphStorage = this.graphEditorService.getGraphStorage();
    }

    onClick(event: any) {
        const componentName = event.target.innerText;
        console.log(componentName);
        this.draw(componentName);
    }

    setStrategy(strategy: ICreateBPELComponentStrategy): void {
        this.strategy = strategy;
    }

    draw(componentName: String): void {
        const vertexId = PropertyGenerator.getID(this.graphEditorService.getMaxID());
        let bpelComponent;
        switch (componentName) {
            case 'process':
                bpelComponent = new Process(vertexId);
                this.setStrategy(new ProcessStrategy());
                break;
            case 'invoke':
                bpelComponent = new Invoke(vertexId);
                this.setStrategy(new InvokeStrategy());
                break;
            case 'receive':
                bpelComponent = new Receive(vertexId);
                this.setStrategy(new ReceiveStrategy());
                break;
            case 'reply':
                bpelComponent = new Reply(vertexId);
                this.setStrategy(new ReplyStrategy());
                break;
            default:
                console.log("The BPEL component building failed");
        }
        let bpelComponentVertexStorage = this.strategy.createComponent(this.graphStorage, bpelComponent, null);
        console.log(bpelComponentVertexStorage);
        console.log(this.graphStorage);
    }

}