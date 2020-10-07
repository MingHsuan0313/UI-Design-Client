import { TargetAttribute } from "./target-attribute.model";

export class Target {
    attribute: TargetAttribute;

    constructor() {
        this.attribute = new TargetAttribute();
    }
}