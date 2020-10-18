import { GraphStorage } from "../../graph-dependency";

export class GraphConfiguration {
    selectedCells: mxCell[];
    graphStorage: GraphStorage;

    constructor(graphStorage: GraphStorage) {
        let editor = graphStorage.editor;
        this.configureEditorKeyBinding(editor);
        this.configureGraphListener(editor);
        this.graphStorage = graphStorage;
    }

    configureEditorKeyBinding(editor: mxEditor) {
        editor.addAction("mx-cut", (event) => {
            editor.execute("cut");
            this.selectedCells = event.graph.selectionModel.cells;
            let selectedCellsIDs = this.getCellsIDs();
        })

        editor.addAction("mx-copy", (event) => {
            editor.execute("copy");
            this.selectedCells = event.graph.selectionModel.cells;
            let selectedCellsIDs = this.getCellsIDs();
        })

        editor.addAction("mx-paste", (event) => {
            let sourceIDs = this.getCellsIDs();
            editor.execute("paste");
            let targetIDs = this.getCellsIDs();
            this.graphStorage.createVertexStorageByCell(sourceIDs,targetIDs);
            this.selectedCells = event.graph.selectionModel.cells;
        })

        editor.addAction("mx-delete", (event) => {
            this.selectedCells = event.graph.selectionModel.cells;
            editor.execute("delete");
            this.selectedCells = event.graph.selectionModel.cells;
            let selectedCellsIDs = this.getCellsIDs();
        })

        editor.addAction("mx-selectAll", (event) => {
            editor.execute("selectAll");
            this.selectedCells = event.graph.selectionModel.cells;
        })

        editor.addAction("mx-undo", (event) => {
            editor.execute("undo");
            this.selectedCells = event.graph.selectionModel.cells;
        })

        editor.addAction("mx-redo", (event) => {
            editor.execute("redo");
            this.selectedCells = event.graph.selectionModel.cells;
        })

        editor.addAction("mx-group", (event) => {
            editor.execute("group");
            this.selectedCells = event.graph.selectionModel.cells;
        })

        editor.addAction("mx-ungroup", (event) => {
            editor.execute("ungroup");
            this.selectedCells = event.graph.selectionModel.cells;
        })
    }

    configureGraphListener(editor: mxEditor) {
        editor.graph.addListener(mxEvent.RESIZE_CELLS, (sender, event) => {
        })

        editor.graph.addListener(mxEvent.MOVE_CELLS, (sender, event) => {
        })

        editor.graph.addMouseListener(
            {
                mouseDown: function (sender, evt) {
                },
                mouseMove: function (sender, evt) {
                },
                mouseUp: function (sender, evt) {
                }
            }
        );
    }

    getCellsIDs() {
        let selectedCellsIDs = []
        for(let index = 0;index < this.selectedCells.length;index++) {
            selectedCellsIDs.push(this.selectedCells[index].id);
        }
        return selectedCellsIDs;
    }
}