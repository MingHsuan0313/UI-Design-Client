import { AfterViewInit, Component } from "@angular/core";
import { GraphStorage } from "src/app/models/modelDependency";
import GraphEditorService from "src/app/services/graph-editor.service";
import { PropertyGenerator } from "src/app/shared/property-generator";
import { ProcessAttribute } from "../../models/components/attribute/containers/process-attribute.model";
import { BPELComponent } from "../../models/components/component/BPELComponent.model";
import { Process } from "../../models/components/component/containers/process.model";
import { ProcessElement } from "../../models/components/element/containers/process-element.model";
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

    setStrategy(strategy: ICreateBPELComponentStrategy): void {
        this.strategy = strategy;
    }

    draw(): void {
        const vertexId = PropertyGenerator.getID(this.graphEditorService.getMaxID());
        if (true) {
            this.setStrategy(new ProcessStrategy());
            const process = new Process(vertexId);
            let processVertexStorage = this.strategy.createComponent(this.graphStorage, process, null);
            var processComponentAttribute = ((processVertexStorage.getComponent() as BPELComponent).getAttribute() as ProcessAttribute);
            var processComponentElement = ((processVertexStorage.getComponent() as BPELComponent).getElement() as ProcessElement);
            console.log(processComponentAttribute);
            console.log(processComponentElement);
        }
        console.log(this.graphStorage);
    }

}