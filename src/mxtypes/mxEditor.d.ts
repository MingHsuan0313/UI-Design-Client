declare class mxEditor {
    graph: any;
    keyHandler: any;
    constructor(config);
    constructor();
    addAction(actionname,funct);
    addVertex(parent,vertex,x,y);
    redo();
    undo();
    save(url,linefeed);
    setGraphContainer(container);
    swapStyles(first,second)
}