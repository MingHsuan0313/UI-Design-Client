export default class Undo {
    undoActionsCollection: ChangeRepresentationObjectStack; 
    constructor(size) {

    }

    Undo(level: number) {

    }
}

class ChangeRepresentationObjectStack {
    changeRepresentationObjects: ChangeRepresentationObject[];
    size: number;

    isEmpty() {
        if(this.changeRepresentationObjects.length == 0)
            return true;
        else
            return false;
    }

    isFull() {
        if(this.changeRepresentationObjects.length > this.size)
            return true;
        else
            return false;
    }

    push(changeRepresentationObject:ChangeRepresentationObject) {
        this.changeRepresentationObjects.push(changeRepresentationObject);
    };

    pop() {
        this.changeRepresentationObjects.pop();
    };
}

class  ChangeRepresentationObject {
    changes: mxCell[];
}