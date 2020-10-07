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
import { Scope } from "../../models/components/containers/scope/scope.model";
import { ScopeStrategy } from "../../models/createBPELComponentStrategy/ScopeStrategy";
import { Validate } from "../../models/components/containers/validate/validate.model";
import { ValidateStrategy } from "../../models/createBPELComponentStrategy/ValidateStrategy";
import { Throw } from "../../models/components/basic-activities/throw/throw.model";
import { ThrowStrategy } from "../../models/createBPELComponentStrategy/ThrowStrategy";
import { Wait } from "../../models/components/basic-activities/wait/wait.model";
import { WaitStrategy } from "../../models/createBPELComponentStrategy/WaitStrategy";
import { Empty } from "../../models/components/basic-activities/empty.model";
import { Exit } from "../../models/components/basic-activities/exit.model";
import { Rethrow } from "../../models/components/basic-activities/rethrow.model";
import { EmptyStrategy } from "../../models/createBPELComponentStrategy/EmptyStrategy";
import { ExitStrategy } from "../../models/createBPELComponentStrategy/ExitStrategy";
import { RethrowStrategy } from "../../models/createBPELComponentStrategy/RethrowStrategy";
import { RepeatUntil } from "../../models/components/structured-activities/repeatUntil/repeatUntil.model";
import { RepeatUntilStrategy } from "../../models/createBPELComponentStrategy/RepeatUntilStrategy";
import { Flow } from "../../models/components/structured-activities/flow/flow.model";
import { FlowStrategy } from "../../models/createBPELComponentStrategy/FlowStrategy";
import { ForEach } from "../../models/components/structured-activities/forEach/forEach.model";
import { ForEachStrategy } from "../../models/createBPELComponentStrategy/ForEachStrategy";
import { Compensate } from "../../models/components/others/compensate.model";
import { CompensateStrategy } from "../../models/createBPELComponentStrategy/CompensateStrategy";
import { CompensateScope } from "../../models/components/others/compensateScope/compensateScope.model";
import { CompensateScopeStrategy } from "../../models/createBPELComponentStrategy/CompensateScopeStrategy";

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
            case 'scope':
                bpelComponent = new Scope(vertexId);
                this.setStrategy(new ScopeStrategy());
                break;
            case 'validate':
                bpelComponent = new Validate(vertexId);
                this.setStrategy(new ValidateStrategy());
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
            case 'throw':
                bpelComponent = new Throw(vertexId);
                this.setStrategy(new ThrowStrategy());
                break;
            case 'wait':
                bpelComponent = new Wait(vertexId);
                this.setStrategy(new WaitStrategy());
                break;
            case 'empty':
                bpelComponent = new Empty(vertexId);
                this.setStrategy(new EmptyStrategy());
                break;
            case 'exit':
                bpelComponent = new Exit(vertexId);
                this.setStrategy(new ExitStrategy());
                break;
            case 'rethrow':
                bpelComponent = new Rethrow(vertexId);
                this.setStrategy(new RethrowStrategy());
                break;
            case 'sequence':
                bpelComponent = new Sequence(vertexId);
                this.setStrategy(new SequenceStrategy());
                break;
            case 'flow':
                bpelComponent = new Flow(vertexId);
                this.setStrategy(new FlowStrategy());
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
            case 'repeatUntil':
                bpelComponent = new RepeatUntil(vertexId);
                this.setStrategy(new RepeatUntilStrategy());
                break;
            case 'forEach':
                bpelComponent = new ForEach(vertexId);
                this.setStrategy(new ForEachStrategy());
                break;
            case 'pick':
                bpelComponent = new Pick(vertexId);
                this.setStrategy(new PickStrategy());
                break;
            case 'onMessage':
                bpelComponent = new OnMessage(vertexId);
                this.setStrategy(new OnMessageStrategy());
                break;
            case 'compensate':
                bpelComponent = new Compensate(vertexId);
                this.setStrategy(new CompensateStrategy());
                break;
            case 'compensateScope':
                bpelComponent = new CompensateScope(vertexId);
                this.setStrategy(new CompensateScopeStrategy());
                break;
            default:
                console.log("The BPEL component building failed");
        }
        let bpelComponentVertexStorage = this.strategy.createComponent(this.graphStorage, bpelComponent, null);
        console.log(bpelComponentVertexStorage);
        console.log(this.graphStorage);
    }

}