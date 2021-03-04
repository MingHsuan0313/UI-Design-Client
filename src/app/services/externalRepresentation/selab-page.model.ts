export class SelabPageModel {
    cellStorage: {};
    pageId: string;
    name: string;

    constructor(pageId: string) {
        this.cellStorage = {};
        this.pageId = pageId;
        this.name = "newPage";
    }

    changePageName(newName: string) {
        this.name = newName;
    }

    savePage(model: mxGraphModel) {
        this.cellStorage = {};
        this.cellStorage = model.cells;
    }

    loadPage() {
        return this.cellStorage;
    }

    storePage() {

    }

    retrivePage() {

    }
}