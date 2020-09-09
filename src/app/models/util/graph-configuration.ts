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
            console.log(event);
            this.selectedCells = event.graph.selectionModel.cells;
            console.log("fire cut");
            editor.execute("cut");
        })

        editor.addAction("mx-copy", (event) => {
            console.log(event);
            this.selectedCells = event.graph.selectionModel.cells;
            console.log("fire copy");
            editor.execute("copy");
        })

        editor.addAction("mx-paste", (event) => {
            console.log(event);
            this.selectedCells = event.graph.selectionModel.cells;
            console.log("fire paste");
            editor.execute("paste");
        })

        editor.addAction("mx-delete", (event) => {
            console.log("fire delete");
            this.selectedCells = event.graph.selectionModel.cells;
            console.log(event);
            editor.execute("delete");
        })

        editor.addAction("mx-selectAll", (event) => {
            console.log("fire selectAll");
            this.selectedCells = event.graph.selectionModel.cells;
            console.log(event);
            editor.execute("selectAll");
        })

        editor.addAction("mx-undo", (event) => {
            console.log("fire undo");
            this.selectedCells = event.graph.selectionModel.cells;
            console.log(event);
            editor.execute("undo");
        })

        editor.addAction("mx-redo", (event) => {
            console.log("fire redo");
            this.selectedCells = event.graph.selectionModel.cells;
            console.log(event);
            editor.execute("redo");
        })

        editor.addAction("mx-group", (event) => {
            console.log("fire group");
            this.selectedCells = event.graph.selectionModel.cells;
            console.log(event);
            editor.execute("group");
        })

        editor.addAction("mx-ungroup", (event) => {
            console.log("fire ungroup");
            this.selectedCells = event.graph.selectionModel.cells;
            console.log(event);
            editor.execute("ungroup");
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
                    // console.log("mouse down");
                    // console.log(evt);
                },
                mouseMove: function (sender, evt) {
                },
                mouseUp: function (sender, evt) {
                    // console.log("mouse up");
                    // console.log(evt);
                }
            }
        );
    }

}