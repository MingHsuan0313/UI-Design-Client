export class NavigationItem {
    displayName: string;
    children?: NavigationItem[];
    constructor() {
        this.displayName = "";
        this.children = [];
    }
    
    setDisplayName(name) {
        this.displayName = name;
        return this;
    }
    
    addChild(item: NavigationItem) {
        this.children.push(item);
        return this;
    }
} 