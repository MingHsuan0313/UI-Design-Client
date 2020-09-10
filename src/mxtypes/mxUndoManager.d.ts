declare class mxUndoManager {
    constructor(size);
    constructor();
    isEmpty();
    redo();
    undo();
    trim();
    undoableEditHappened(evtProperty);

    size;
    history;
    eventSource;
}