import { BPELNode } from "../../BPELNode.model";
import { EventHandlersElement } from "./eventHandlers-element.model";

export class EventHandlers extends BPELNode {
    element: EventHandlersElement;

    constructor() {
        super();
        this.element = new EventHandlersElement();
    }
}