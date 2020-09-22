import { AfterViewInit, Component } from "@angular/core";
import { GraphStorage } from "src/app/models/modelDependency";
import GraphEditorService from "src/app/services/graph-editor.service";
import { PropertyGenerator } from "src/app/shared/property-generator";
import { Process } from "../../models/components/component/containers/process.model";
import { ICreateBPELComponentStrategy } from "../../models/createBPELComponentStrategy/ICreateBPELComponentStrategy";
import { ProcessStrategy } from "../../models/createBPELComponentStrategy/ProcessStrategy";

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
            default:
                console.log("The BPEL component building failed");
        }
        let bpelComponentVertexStorage = this.strategy.createComponent(this.graphStorage, bpelComponent, null);
        console.log(bpelComponentVertexStorage);
        console.log(this.graphStorage);
    }

}