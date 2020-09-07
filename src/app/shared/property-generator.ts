export class PropertyGenerator {
  static id = 1;
  static pageID = 0;

  static getID(maxID) {
    this.id = maxID+1;
    return this.id.toString();
  }

  static getSelector(componentName, maxID) {
    this.id = maxID+2;
    return componentName + this.id.toString();
  }

  static getPageID() {
    this.pageID++;
    return this.pageID.toString();
  }
}
