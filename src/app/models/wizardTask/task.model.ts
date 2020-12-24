import { ServiceComponent } from "../store/serviceEntry.model";

export class Task {
    public componentType: string;

    public operation: ServiceComponent;

    public getComponentType(): string {
        return this.componentType;
    }

    public setComponentType(componentType: string) {
        this.componentType = componentType;
        return this;
    }

    public getOperation(): ServiceComponent {
        return this.operation;
    }

    public setOperation(operation: ServiceComponent) {
        this.operation = operation;
        return this;
    }

}