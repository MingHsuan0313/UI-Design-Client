import { ServiceComponentModel } from "../service-component-dependency";

export class Task {
    public componentType: string;

    public operation: ServiceComponentModel;

    public getComponentType(): string {
        return this.componentType;
    }

    public setComponentType(componentType: string) {
        this.componentType = componentType;
        return this;
    }

    public getOperation(): ServiceComponentModel {
        return this.operation;
    }

    public setOperation(operation: ServiceComponentModel) {
        this.operation = operation;
        return this;
    }
}