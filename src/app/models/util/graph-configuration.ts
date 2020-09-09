import { GraphStorage } from "../modelDependency";

export class GraphConfiguration {
    selectedCells: mxCell[];
    graphStorage: GraphStorage;


    constructor(graphStorage: GraphStorage) {
        let editor = graphStorage.editor;
        this.configureEditorKeyBinding(editor);
        this.configureGraphListener(editor);
    }

    configureEditorKeyBinding(editor: mxEditor) {
        editor.addAction("mx-cut", (event) => {
            console.log("fire cut");
            editor.execute("cut");
            this.selectedCells = event.graph.selectionModel.cells;
            let selectedCellsIDs = this.getCellsIDs();
            console.log(selectedCellsIDs);
        })

        editor.addAction("mx-copy", (event) => {
            editor.execute("copy");
            console.log("fire copy");
            this.selectedCells = event.graph.selectionModel.cells;
            let selectedCellsIDs = this.getCellsIDs();
            console.log(selectedCellsIDs);
        })

        editor.addAction("mx-paste", (event) => {
            let soueceIDs = this.getCellsIDs();
            editor.execute("paste");
            let targetIDs = this.getCellsIDs();
            console.log("fire paste");
            this.selectedCells = event.graph.selectionModel.cells;
            console.log(soueceIDs);
            console.log(targetIDs);
        })

        editor.addAction("mx-delete", (event) => {
            this.selectedCells = event.graph.selectionModel.cells;
            console.log(this.selectedCells)
            editor.execute("delete");
            console.log("fire delete");
            this.selectedCells = event.graph.selectionModel.cells;
            let selectedCellsIDs = this.getCellsIDs();
            console.log(selectedCellsIDs);
        })

        editor.addAction("mx-selectAll", (event) => {
            editor.execute("selectAll");
            console.log("fire selectAll");
            this.selectedCells = event.graph.selectionModel.cells;
            console.log(event);
        })

        editor.addAction("mx-undo", (event) => {
            editor.execute("undo");
            console.log("fire undo");
            this.selectedCells = event.graph.selectionModel.cells;
            console.log(event);
        })

        editor.addAction("mx-redo", (event) => {
            editor.execute("redo");
            console.log("fire redo");
            this.selectedCells = event.graph.selectionModel.cells;
            console.log(event);
        })

        editor.addAction("mx-group", (event) => {
            editor.execute("group");
            console.log("fire group");
            this.selectedCells = event.graph.selectionModel.cells;
            console.log(event);
        })

        editor.addAction("mx-ungroup", (event) => {
            editor.execute("ungroup");
            console.log("fire ungroup");
            this.selectedCells = event.graph.selectionModel.cells;
            console.log(event);
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