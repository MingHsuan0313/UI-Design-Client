import { Variables } from "./variables.model";

export class Variable {
    // attributes
    messageType?: String;
    name?: String;
    // TODO: element: <from>

    constructor(messageType: String, name: String) {
        this.messageType = messageType;
        this.name = name;
        console.log("consturct a variable (messageType = %s, name = %s) for the <variables> of selected <process>", messageType, name);
    }
}