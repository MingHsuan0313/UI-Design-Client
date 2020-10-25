import { BPELComponentAttribute } from "../../BPELComponent-attribute.model";

export class ValidateAttribute extends BPELComponentAttribute {
    // variables accepts 1...* variable names (BPELVariableName), separated by whitespaces. 
    variables: string = "";
}