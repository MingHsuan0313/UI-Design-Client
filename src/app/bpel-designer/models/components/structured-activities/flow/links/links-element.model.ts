import { Link } from "./link.model";

export class LinksElement {
    linkList: Link[];   // 1...*

    constructor() {
        this.linkList = new Array<Link>();
    }
}