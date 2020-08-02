export class PropertyGenerator {
  static id = 1;
  static pageID = 0;

  static getID() {
    this.id++;
    return this.id.toString();
  }

  static getSelector(componentName) {
    this.id++;
    return componentName + this.id.toString();
  }

  static getPageID() {
    this.pageID++;
    return this.pageID.toString();
  }
}
