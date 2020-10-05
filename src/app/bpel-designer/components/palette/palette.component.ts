import { AfterViewInit, Component } from "@angular/core";
import { GraphStorage } from "src/app/models/modelDependency";
import GraphEditorService from "src/app/services/graph-editor.service";
import { PropertyGenerator } from "src/app/shared/property-generator";
import { ICreateBPELComponentStrategy } from "../../models/createBPELComponentStrategy/ICreateBPELComponentStrategy";
import { Process } from "../../models/components/containers/process/process.model";
import { ProcessStrategy } from "../../models/createBPELComponentStrategy/ProcessStrategy";
import { Invoke } from "../../models/components/basic-activities/invoke/invoke.model";
import { InvokeStrategy } from "../../models/createBPELComponentStrategy/InvokeStrategy";
import { Receive } from "../../models/components/basic-activities/receive/receive.model";
import { ReceiveStrategy } from "../../models/createBPELComponentStrategy/ReceiveStrategy";
import { Reply } from "../../models/components/basic-activities/reply/reply.model";
import { ReplyStrategy } from "../../models/createBPELComponentStrategy/ReplyStrategy";
import { Assign } from "../../models/components/basic-activities/assign/assign.model";
import { Copy } from "../../models/components/basic-activities/assign/copy/copy.model";
import { AssignStrategy } from "../../models/createBPELComponentStrategy/AssignStrategy";
import { CopyStrategy } from "../../models/createBPELComponentStrategy/CopyStrategy";
import { Sequence } from "../../models/components/structured-activities/sequence/sequence.model";
import { SequenceStrategy } from "../../models/createBPELComponentStrategy/SequenceStrategy";
import { If } from "../../models/components/structured-activities/if/if.model";
import { ElseIfBranchStrategy } from "../../models/createBPELComponentStrategy/ElseIfBranchStrategy";
import { IfStrategy } from "../../models/createBPELComponentStrategy/IfStrategy";
import { ElseIfBranch } from "../../models/components/structured-activities/if/branch/elseif-branch.model";
import { ElseBranch } from "../../models/components/structured-activities/if/branch/else-branch.model";
import { ElseBranchStrategy } from "../../models/createBPELComponentStrategy/ElseBranchStrategy";
import { While } from "../../models/components/structured-activities/while/while.model";
import { WhileStrategy } from "../../models/createBPELComponentStrategy/WhileStrategy";
import { OnMessage } from "../../models/components/structured-activities/pick/onMessage.model";
import { Pick } from "../../models/components/structured-activities/pick/pick.model";
import { OnMessageStrategy } from "../../models/createBPELComponentStrategy/OnMessageStrategy";
import { PickStrategy } from "../../models/createBPELComponentStrategy/PickStrategy";

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
            case 'assign':
                bpelComponent = new Assign(vertexId);
                this.setStrategy(new AssignStrategy());
                break;
            case 'copy':
                bpelComponent = new Copy(vertexId);
                this.setStrategy(new CopyStrategy());
                break;
            case 'sequence':
                bpelComponent = new Sequence(vertexId);
                this.setStrategy(new SequenceStrategy());
                break;
            case 'if':
                bpelComponent = new If(vertexId);
                this.setStrategy(new IfStrategy());
                break;
            case 'elseif':
                bpelComponent = new ElseIfBranch(vertexId);
                this.setStrategy(new ElseIfBranchStrategy());
                break;
            case 'else':
                bpelComponent = new ElseBranch(vertexId);
                this.setStrategy(new ElseBranchStrategy());
                break;
            case 'while':
                bpelComponent = new While(vertexId);
                this.setStrategy(new WhileStrategy());
                break;
            case 'pick':
                bpelComponent = new Pick(vertexId);
                this.setStrategy(new PickStrategy());
                break;
            case 'onMessage':
                bpelComponent = new OnMessage(vertexId);
                this.setStrategy(new OnMessageStrategy());
                break;
            default:
                console.log("The BPEL component building failed");
        }
        let bpelComponentVertexStorage = this.strategy.createComponent(this.graphStorage, bpelComponent, null);
        console.log(bpelComponentVertexStorage);
        console.log(this.graphStorage);
    }

}