export class CatchAttribute {
    faultName?: string = undefined;
    faultVariable?: string = undefined;
    // Gernerally: has either faultMessageType or faultElement, or neither of them.
    // <invoke>: has both, either, or neither of them
    faultMessageType?: string = undefined;
    faultElement?: string = undefined;
}