export class SelabPageModel {
    cellStorage: Map<string, mxCell>;
    pageId: string;

    savePage(mxCells) {
        for(let key in mxCells) {
            this.cellStorage.set(mxCells[key].id, mxCells[key]);
        }
    }

    loadPage() {
        return this.cellStorage;
    }

    storePage() {

    }

    retrivePage() {

    }
}