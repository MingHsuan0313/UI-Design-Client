import { IServiceEntry } from "./IServiceEntry";

export class ArgumentModel extends IServiceEntry {
    name: string;
    isComplexType: Boolean;
    serviceType: string;
    constraint: string;
    arguments: ArgumentModel[];
    setterUrl: string;
    
    constructor() {
        super();
        this.arguments = [];
        this.isComplexType = false;
        this.serviceType = "Argument";
        this.setterUrl = "";
        this.constraint = "";
    }
    
    setName(name: string) {
        this.name = name;
        return this;
    }
    
    setConstraint(constraint: string) {
        this.constraint = constraint;
        return this;
    }
    
    getConstraint(): string {
        return this.constraint;
    }
    
    addArgument(argument: ArgumentModel) {
        this.arguments.push(argument);
        return this;
    }
                            
    setIsComplexType(isComplexType) {
        this.isComplexType = isComplexType;
        return this;
    }

    getInfo() {
        return {
            name: this.name,
            type: "Argument"
        }
    }
}
