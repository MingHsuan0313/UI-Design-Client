import { FromElement } from "../from-element.model";
import { Query } from "../../query/query.model";

export class FromElementWithQuery extends FromElement {
    query: Query;

    constructor() {
        super();
        // eager creation
        this.query = new Query();
    }
}