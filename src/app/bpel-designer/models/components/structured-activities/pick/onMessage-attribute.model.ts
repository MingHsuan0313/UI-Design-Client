export class OnMessageAttribute {
    variable?: String = undefined;
    partnerLink: String = undefined;
    operation: String = undefined;
    portType?: String = undefined;
    messageExchange?: string = undefined;

    constructor() {
        // fake data
        let variable = "Main.startRequest.0";
        let partnerLink = "GetDepartmentMain";
        let operation = "start";
        let portType = "startInteractionPort";

        this.variable = variable;
        this.partnerLink = partnerLink;
        this.operation = operation;
        this.portType = portType;
    }
}