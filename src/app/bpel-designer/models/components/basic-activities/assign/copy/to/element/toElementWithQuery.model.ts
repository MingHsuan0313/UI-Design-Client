import { Query } from "../../query/query.model";
import { ToElement } from "../to-element.model";

export class ToElementWithQuery extends ToElement {
    query: Query;

    constructor() {
        super();
        // eager creation
        this.query = new Query();
        console.log("create to-spec ToElementWithQuery");
    }
}