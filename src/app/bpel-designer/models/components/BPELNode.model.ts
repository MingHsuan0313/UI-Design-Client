export class BPELNode {
    attribute?: any;    // Because there may be attributes not belonging to BPELComponentAttribute
    element?: any;  // Because there may be elements not belonging to BPELComponentElement

    getAttribute(): any {
        return this.attribute;
    }

    getElement(): any {
        return this.element;
    }
}