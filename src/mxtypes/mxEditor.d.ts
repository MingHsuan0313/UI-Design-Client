declare class mxEditor {
    graph: mxGraph;
    keyHandler: any;
    modified: Boolean;
    constructor(config);
    constructor();
    configure(config);
    addAction(actionname,funct);
    addVertex(parent,vertex,x,y);
    redo();
    undo();
    save(url,linefeed);
    setGraphContainer(container);
    swapStyles(first,second);
    execute(action);
    setModified(value);
}