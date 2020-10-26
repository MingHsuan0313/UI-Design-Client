import { Link } from "./link.model";

export class LinksElement {
    linkList: Link[];   // 1...*

    constructor() {
        this.linkList = new Array<Link>();
        this.linkList.push(new Link());
        console.log("[CONSTRUCT] construct a new <link> for the linkList");
    }

    push(): void {
        this.linkList.push(new Link());
    }

    pop(): void {
        this.linkList.pop();
    }
}