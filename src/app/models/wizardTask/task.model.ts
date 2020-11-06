import { Operation } from "./operation.model";

export class Task {
    public componentType: string;
    public operation: Operation;

    public getComponentType(): string {
        return this.componentType;
    }

    public setComponentType(componentType: string) {
        this.componentType = componentType;
        return this;
    }

    public getOperation(): Operation {
        return this.operation;
    }

    public setOperation(operation: Operation) {
        this.operation = operation;
        return this;
    }

}