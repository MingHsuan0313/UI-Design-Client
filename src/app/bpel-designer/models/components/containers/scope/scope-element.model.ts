import { BPELComponentElement } from "../../BPELComponent-element.model";
import { BPELComponent } from "../../BPELComponent.model";
import { CompensationHandler } from "../../others/compensationHandler/compensationHandler.model";
import { CorrelationSets } from "../correlationSets/correlationSets.model";
import { EventHandlers } from "../eventHandlers/eventHandlers.model";
import { FaultHandlers } from "../faultHandlers/faultHandlers.model";
import { MessageExchanges } from "../messageExchanges/messageExchanges.model";
import { PartnerLinks } from "../partnerLinks/partnerLinks.model";
import { Variables } from "../variables/variables.model";
import { TerminationHandler } from "./terminationHandler/terminationHandler.model";

export class ScopeElement extends BPELComponentElement {
    variables?: Variables;
    partnerLinks?: PartnerLinks;
    messageExchanges?: MessageExchanges;
    correlationSets?: CorrelationSets;
    faultHandlers?: FaultHandlers;
    eventHandlers?: EventHandlers;
    compensationHandler?: CompensationHandler;
    terminationHandler?: TerminationHandler;
    activity: BPELComponent;

    constructor() {
        super();
        // eager creation
        this.variables = new Variables();
        this.partnerLinks = new PartnerLinks();
        this.messageExchanges = new MessageExchanges();
        this.correlationSets = new CorrelationSets();
        this.faultHandlers = new FaultHandlers();
        this.eventHandlers = new EventHandlers();
        this.compensationHandler = new CompensationHandler();
        this.terminationHandler = new TerminationHandler();
    }
}