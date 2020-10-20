import { Variables } from "../variables/variables.model";
import { Extensions } from "./extensions/extensions.model";
import { Import } from "./import/import.model";
import { PartnerLinks } from "../partnerLinks/partnerLinks.model";
import { MessageExchanges } from "../messageExchanges/messageExchanges.model";
import { CorrelationSets } from "../correlationSets/correlationSets.model";
import { FaultHandlers } from "../faultHandlers/faultHandlers.model";
import { EventHandlers } from "../eventHandlers/eventHandlers.model";
import { BPELComponentElementWithActivity } from "../../BPELComponentElementWithActivity.model";

export class ProcessElement extends BPELComponentElementWithActivity {
    variables?: Variables;
    extensions?: Extensions;
    import?: Import;
    partnerLinks?: PartnerLinks;
    messageExchanges?: MessageExchanges;
    correlationSets?: CorrelationSets;
    faultHandlers?: FaultHandlers;
    eventHandlers?: EventHandlers;
    // activity: BPELComponent;

    constructor() {
        super();
        // eager creation
        this.variables = new Variables();
        this.extensions = new Extensions();
        this.import = new Import();
        this.partnerLinks = new PartnerLinks();
        this.messageExchanges = new MessageExchanges();
        this.correlationSets = new CorrelationSets();
        this.faultHandlers = new FaultHandlers();
        this.eventHandlers = new EventHandlers();
    }
}