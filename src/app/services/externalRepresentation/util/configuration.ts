export class Configuration {
    static configureEditorKeyBinding(editor: mxEditor): void {
        editor.addAction("mx-cut", (event) => {
            console.log("fire cut...")
            editor.execute("cut");
        })

        editor.addAction("mx-copy", (editor, cell) => {
            editor.execute("copy");
            // let graph = editor.graph;
            // let cells = editor.graph.selectionModel.cells;
            // mxClipboard.copy(graph, cells);
        })

        editor.addAction("mx-paste", (editor) => {
            // let graph = editor.graph;
            // let cells = editor.graph.selectionModel.cells;
            // console.log(editor);
            // console.log(graph);
            // mxClipboard.paste(graph);
            editor.execute("paste");
        })

        editor.addAction("mx-delete", (event) => {
            editor.execute("delete");
        })

        editor.addAction("mx-selectAll", (event) => {
            editor.execute("selectAll");
        })

        editor.addAction("mx-undo", (event) => {
            editor.execute("undo");
        })

        editor.addAction("mx-redo", (event) => {
            editor.execute("redo");
        })

        editor.addAction("mx-group", (event) => {
            editor.execute("group");
        })

        editor.addAction("mx-ungroup", (event) => {
            editor.execute("ungroup");
        })
    }

    static configureGraphListener(editor: mxEditor): void {
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

}