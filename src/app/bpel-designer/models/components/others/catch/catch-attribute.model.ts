export class CatchAttribute {
    faultName?: string;
    faultVariable?: string;
    // Gernerally: has either faultMessageType or faultElement, or neither of them.
    // <invoke>: has both, either, or neither of them
    faultMessageType?: string;
    faultElement?: string;
}