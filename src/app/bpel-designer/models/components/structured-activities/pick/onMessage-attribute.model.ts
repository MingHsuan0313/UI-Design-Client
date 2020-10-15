export class OnMessageAttribute {
    variable?: string = undefined;
    partnerLink: string = undefined;
    operation: string = undefined;
    portType?: string = undefined;
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