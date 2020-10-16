import { FromVariantWithExpressionLanguageAndExpressionCreator } from "../../basic-activities/assign/copy/from/creators/fromVariantWithExpressionLanguageAndExpressionCreator";
import { FromVariantWithLiteralCreator } from "../../basic-activities/assign/copy/from/creators/fromVariantWithLiteralCreator";
import { FromVariantWithPartnerLinkAndEndPointReferenceCreator } from "../../basic-activities/assign/copy/from/creators/fromVariantWithPartnerLinkAndEndPointReferenceCreator";
import { FromVariantWithVariableAndPartAndQueryCreator } from "../../basic-activities/assign/copy/from/creators/fromVariantWithVariableAndPartAndQueryCreator";
import { FromVariantWithVariableAndPropertyCreator } from "../../basic-activities/assign/copy/from/creators/fromVariantWithVariableAndPropertyCreator";
import { IFromCreator } from "../../basic-activities/assign/copy/from/creators/IFromCreator";
import { From } from "../../basic-activities/assign/copy/from/from.model";

export class VariableElement {
    from: From;
    provideFrom: Map<string, IFromCreator>;

    constructor() {
        // provided from-spec
        this.provideFrom = new Map<string, IFromCreator>();
        this.provideFrom.set("FromVariantWithVariableAndPartAndQuery", new FromVariantWithVariableAndPartAndQueryCreator());
        this.provideFrom.set("FromVariantWithPartnerLinkAndEndPointReference", new FromVariantWithPartnerLinkAndEndPointReferenceCreator());
        this.provideFrom.set("FromVariantWithVariableAndProperty", new FromVariantWithVariableAndPropertyCreator());
        this.provideFrom.set("FromVariantWithExpressionLanguageAndExpression", new FromVariantWithExpressionLanguageAndExpressionCreator());
        this.provideFrom.set("FromVariantWithLiteral", new FromVariantWithLiteralCreator());

        this.from = this.constructDefaultFromSpec();
    }

    constructDefaultFromSpec(): From {
        // Default from-spec: "FromVariantWithVariableAndPartAndQuery"
        return this.provideFrom.get("FromVariantWithVariableAndPartAndQuery").createFrom();
    }
}