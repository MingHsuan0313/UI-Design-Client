import { AfterViewInit, Component, Input } from "@angular/core";
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
import UpdateBPELDocService from "../../services/updateBPELDoc.service";
import VertexStorage from "src/app/models/vertex-storage.model";
import { BPELComponent } from "../../models/components/BPELComponent.model";
import IOBPELDocService from "../../services/ioBPELDoc/ioBPELDoc.service";

@Component({
    selector: 'palette',
    templateUrl: './palette.component.html',
    styleUrls: ['./palette.component.scss']
})
export class PaletteComponent implements AfterViewInit {
    graphStorage: GraphStorage;
    strategy: ICreateBPELComponentStrategy;
    targetContainerActivity: BPELComponent = null;
    basex: number = 0;
    basey: number = 0;
    CREATE_VERTEX_DISPLACEMENT_DISTANCE: number = 130;
    importingTargetContainerActivityNameWithIdStack: string[] = new Array<string>();
    importingComponentNameWithIdComponentMap: Map<string, BPELComponent> = new Map<string, BPELComponent>();

    @Input() userSettedTargetContainerActivity: BPELComponent;

    constructor(private updateBPELDocService: UpdateBPELDocService, private graphEditorService: GraphEditorService, private ioBPELDocService: IOBPELDocService) {
        // Scenario: import a BPEL doc
        ioBPELDocService.subscribe((componentNameWithIdStack_curParentNodeNameWithId: [string[], string]) => {
            let componentNameWithIdStack = componentNameWithIdStack_curParentNodeNameWithId[0];
            let curParentNodeNameWithId = componentNameWithIdStack_curParentNodeNameWithId[1];

            if (componentNameWithIdStack.length) {
                let lastComponentNameWithId = componentNameWithIdStack[componentNameWithIdStack.length - 1];
                // have not drawn
                if (!this.importingComponentNameWithIdComponentMap.get(lastComponentNameWithId)) {
                    let componentName = this.extractComponentNameOfComponentNameWithId(lastComponentNameWithId);
                    let bpelComponent;
                    // check if given a parent activity
                    if (curParentNodeNameWithId != undefined) {
                        let importingTargetContainerActivity = this.importingComponentNameWithIdComponentMap.get(curParentNodeNameWithId);
                        bpelComponent = this.draw(componentName, importingTargetContainerActivity);
                    } else {
                        bpelComponent = this.draw(componentName);
                    }
                    // drawn successfully because it belongs to a BPELComponent
                    if (bpelComponent) {
                        this.importingComponentNameWithIdComponentMap.set(lastComponentNameWithId, bpelComponent);
                        // check instanceof types in the following set:
                        // {BPELComponentElementWithActivity, BPELComponentElementWithActivityList, BPELComponentElementWithActivityAndActivityList, ElseIfBranch, ElseBranch}
                        if (bpelComponent instanceof Process || bpelComponent instanceof Scope ||
                            bpelComponent instanceof Sequence ||bpelComponent instanceof Flow ||
                            bpelComponent instanceof If || bpelComponent instanceof ElseIfBranch || bpelComponent instanceof ElseBranch ||
                            bpelComponent instanceof While || bpelComponent instanceof RepeatUntil || bpelComponent instanceof ForEach ||
                            bpelComponent instanceof Pick || bpelComponent instanceof OnMessage ||
                            bpelComponent instanceof Assign) {
                            // push new targetContainerActivity
                            this.importingTargetContainerActivityNameWithIdStack.push(lastComponentNameWithId);
                        }
                    }
                }
            }
        });
    }

    ngAfterViewInit(): void {
        this.graphStorage = this.graphEditorService.getGraphStorage();
    }

    onClick(event: any) {
        const componentName = event.target.innerText;
        if (this.isGraphVertexStorageEmpty()) {
            if (componentName == "process") {
                this.draw(componentName);
            } else {
                alert("[ERROR] Must create a <process> vertex first");
            }
        } else {
            this.draw(componentName);
        }
    }

    getGraphFirstVertexStorage(): VertexStorage {
        return this.graphStorage.findVertexStorageByID(2);
    }

    isGraphVertexStorageEmpty(): boolean {
        if (this.getGraphFirstVertexStorage() == undefined) {
            return true
        }
        return false;
    }

    setStrategy(strategy: ICreateBPELComponentStrategy): void {
        this.strategy = strategy;
    }

    extractComponentNameOfComponentNameWithId(componentNameWithId: string): string {
        return componentNameWithId.split('_')[0];
    }

    draw(componentName: string, importingTargetContainerActivity?: BPELComponent): BPELComponent {
        const vertexId = PropertyGenerator.getID(this.graphEditorService.getMaxID());
        let bpelComponent;
        switch (componentName) {
            case 'process':
                bpelComponent = new Process(vertexId, this.updateBPELDocService);
                this.setStrategy(new ProcessStrategy(this.basex, this.basey));
                break;
            case 'scope':
                bpelComponent = new Scope(vertexId, this.updateBPELDocService);
                this.setStrategy(new ScopeStrategy(this.basex, this.basey));
                break;
            case 'validate':
                bpelComponent = new Validate(vertexId, this.updateBPELDocService);
                this.setStrategy(new ValidateStrategy(this.basex, this.basey));
                break;
            case 'invoke':
                bpelComponent = new Invoke(vertexId, this.updateBPELDocService);
                this.setStrategy(new InvokeStrategy(this.basex, this.basey));
                break;
            case 'receive':
                bpelComponent = new Receive(vertexId, this.updateBPELDocService);
                this.setStrategy(new ReceiveStrategy(this.basex, this.basey));
                break;
            case 'reply':
                bpelComponent = new Reply(vertexId, this.updateBPELDocService);
                this.setStrategy(new ReplyStrategy(this.basex, this.basey));
                break;
            case 'assign':
                bpelComponent = new Assign(vertexId, this.updateBPELDocService);
                this.setStrategy(new AssignStrategy(this.basex, this.basey));
                break;
            case 'copy':
                bpelComponent = new Copy(vertexId, this.updateBPELDocService);
                this.setStrategy(new CopyStrategy(this.basex, this.basey));
                break;
            case 'throw':
                bpelComponent = new Throw(vertexId, this.updateBPELDocService);
                this.setStrategy(new ThrowStrategy(this.basex, this.basey));
                break;
            case 'wait':
                bpelComponent = new Wait(vertexId, this.updateBPELDocService);
                this.setStrategy(new WaitStrategy(this.basex, this.basey));
                break;
            case 'empty':
                bpelComponent = new Empty(vertexId, this.updateBPELDocService);
                this.setStrategy(new EmptyStrategy(this.basex, this.basey));
                break;
            case 'exit':
                bpelComponent = new Exit(vertexId, this.updateBPELDocService);
                this.setStrategy(new ExitStrategy(this.basex, this.basey));
                break;
            case 'rethrow':
                bpelComponent = new Rethrow(vertexId, this.updateBPELDocService);
                this.setStrategy(new RethrowStrategy(this.basex, this.basey));
                break;
            case 'sequence':
                bpelComponent = new Sequence(vertexId, this.updateBPELDocService);
                this.setStrategy(new SequenceStrategy(this.basex, this.basey));
                 break;
            case 'flow':
                bpelComponent = new Flow(vertexId, this.updateBPELDocService);
                this.setStrategy(new FlowStrategy(this.basex, this.basey));
                break;
            case 'if':
                bpelComponent = new If(vertexId, this.updateBPELDocService);
                this.setStrategy(new IfStrategy(this.basex, this.basey));
                break;
            case 'elseif':
                bpelComponent = new ElseIfBranch(vertexId, this.updateBPELDocService);
                this.setStrategy(new ElseIfBranchStrategy(this.basex, this.basey));
                break;
            case 'else':
                bpelComponent = new ElseBranch(vertexId, this.updateBPELDocService);
                this.setStrategy(new ElseBranchStrategy(this.basex, this.basey));
                break;
            case 'while':
                bpelComponent = new While(vertexId, this.updateBPELDocService);
                this.setStrategy(new WhileStrategy(this.basex, this.basey));
                break;
            case 'repeatUntil':
                bpelComponent = new RepeatUntil(vertexId, this.updateBPELDocService);
                this.setStrategy(new RepeatUntilStrategy(this.basex, this.basey));
                break;
            case 'forEach':
                bpelComponent = new ForEach(vertexId, this.updateBPELDocService);
                this.setStrategy(new ForEachStrategy(this.basex, this.basey));
                break;
            case 'pick':
                bpelComponent = new Pick(vertexId, this.updateBPELDocService);
                this.setStrategy(new PickStrategy(this.basex, this.basey));
                break;
            case 'onMessage':
                bpelComponent = new OnMessage(vertexId, this.updateBPELDocService);
                this.setStrategy(new OnMessageStrategy(this.basex, this.basey));
                break;
            case 'compensate':
                bpelComponent = new Compensate(vertexId, this.updateBPELDocService);
                this.setStrategy(new CompensateStrategy(this.basex, this.basey));
                break;
            case 'compensateScope':
                bpelComponent = new CompensateScope(vertexId, this.updateBPELDocService);
                this.setStrategy(new CompensateScopeStrategy(this.basex, this.basey));
                break;
            default:
                console.log("The BPEL component building failed");
                return null;
        }
        this.basex += this.CREATE_VERTEX_DISPLACEMENT_DISTANCE;
        let bpelComponentVertexStorage = this.strategy.createComponent(this.graphStorage, bpelComponent, null);
        console.log(bpelComponentVertexStorage);

        if (importingTargetContainerActivity != undefined) {
            importingTargetContainerActivity.updateBPELDoc(bpelComponent);
            this.targetContainerActivity = importingTargetContainerActivity;
        } else {
            // set targetContainerActivity and update BPEL doc
            if (this.targetContainerActivity != null) {
                this.targetContainerActivity.updateBPELDoc(bpelComponent);
            }
            // check instanceof types in the following set:
            // {BPELComponentElementWithActivity, BPELComponentElementWithActivityList, BPELComponentElementWithActivityAndActivityList, ElseIfBranch, ElseBranch}
            if (bpelComponent instanceof Process || bpelComponent instanceof Scope ||
                bpelComponent instanceof Sequence ||bpelComponent instanceof Flow ||
                bpelComponent instanceof If || bpelComponent instanceof ElseIfBranch || bpelComponent instanceof ElseBranch ||
                bpelComponent instanceof While || bpelComponent instanceof RepeatUntil || bpelComponent instanceof ForEach ||
                bpelComponent instanceof Pick || bpelComponent instanceof OnMessage ||
                bpelComponent instanceof Assign) {
                // Depth-firstly set the targetContainerActivity
                this.targetContainerActivity = bpelComponent;
            }
        }
        console.log("[targetContainerActivity] = ", this.targetContainerActivity.getComponentName() + "(id = " + this.targetContainerActivity.getId() + ")");
        console.log(this.graphStorage);

        return bpelComponent;
    }

    syncTargetContainerActivity(): void {
        this.targetContainerActivity = this.userSettedTargetContainerActivity;
        console.log("[targetContainerActivity changed] = ", this.targetContainerActivity.getComponentName() + "(id = " + this.targetContainerActivity.getId() + ")");
    }
}