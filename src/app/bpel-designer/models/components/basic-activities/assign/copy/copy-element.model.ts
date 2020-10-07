import { FromVariantWithExpressionLanguageAndExpressionCreator } from "./from/creators/fromVariantWithExpressionLanguageAndExpressionCreator";
import { FromVariantWithLiteralCreator } from "./from/creators/fromVariantWithLiteralCreator";
import { FromVariantWithPartnerLinkAndEndPointReferenceCreator } from "./from/creators/fromVariantWithPartnerLinkAndEndPointReferenceCreator";
import { FromVariantWithVariableAndPartAndQueryCreator } from "./from/creators/fromVariantWithVariableAndPartAndQueryCreator";
import { FromVariantWithVariableAndPropertyCreator } from "./from/creators/fromVariantWithVariableAndPropertyCreator";
import { IFromCreator } from "./from/creators/IFromCreator";
import { From } from "./from/from.model";
import { IToCreator } from "./to/creators/IToCreator";
import { ToVariantWithExpressionLanguageAndExpressionCreator } from "./to/creators/toVariantWithExpressionLanguageAndExpressionCreator";
import { ToVariantWithPartnerLinkCreator } from "./to/creators/toVariantWithPartnerLinkCreator";
import { ToVariantWithVariableAndPartAndQueryCreator } from "./to/creators/toVariantWithVariableAndPartAndQueryCreator";
import { ToVariantWithVariableAndPropertyCreator } from "./to/creators/toVariantWithVariableAndPropertyCreator";
import { To } from "./to/to.model";

// Not a BPELComponentAttribute because of lacking of standard elements
export class CopyElement {
    from: From;
    to: To;
    provideFrom: Map<string, IFromCreator>;
    provideTo: Map<string, IToCreator>;

    constructor() {
        // provided from-spec
        this.provideFrom = new Map<string, IFromCreator>();
        this.provideFrom.set("FromVariantWithVariableAndPartAndQuery", new FromVariantWithVariableAndPartAndQueryCreator());
        this.provideFrom.set("FromVariantWithPartnerLinkAndEndPointReference", new FromVariantWithPartnerLinkAndEndPointReferenceCreator());
        this.provideFrom.set("FromVariantWithVariableAndProperty", new FromVariantWithVariableAndPropertyCreator());
        this.provideFrom.set("FromVariantWithExpressionLanguageAndExpression", new FromVariantWithExpressionLanguageAndExpressionCreator());
        this.provideFrom.set("FromVariantWithLiteral", new FromVariantWithLiteralCreator());
        // provided to-spec
        this.provideTo = new Map<string, IToCreator>();
        this.provideTo.set("ToVariantWithVariableAndPartAndQuery", new ToVariantWithVariableAndPartAndQueryCreator());
        this.provideTo.set("ToVariantWithPartnerLink", new ToVariantWithPartnerLinkCreator());
        this.provideTo.set("ToVariantWithVariableAndProperty", new ToVariantWithVariableAndPropertyCreator());
        this.provideTo.set("ToVariantWithExpressionLanguageAndExpression", new ToVariantWithExpressionLanguageAndExpressionCreator());
    }

    createFrom(fromName: string): From {
        if (this.provideFrom.has(fromName)) {
            return this.provideFrom.get(fromName).createFrom();
        } else {
            console.log("The form-spec does not exist");
        }
    }

    createTo(toName: string): To {
        if (this.provideTo.has(toName)) {
            return this.provideTo.get(toName).createTo();
        } else {
            console.log("The to-spec does not exist");
        }
    }
}