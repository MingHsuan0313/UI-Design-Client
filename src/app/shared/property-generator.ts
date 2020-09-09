export class PropertyGenerator {
  static id = 1;
  static pageID = 0;
  static lastMaxID = 0;
  static count = 1;
  static getID(maxID) {
    if(this.lastMaxID == maxID){
      this.count += 1;
    }else{
      this.lastMaxID = maxID;
      this.count = 1;
    }
    this.id = maxID+this.count;
    return this.id.toString();
  }

  static getSelector(componentName) {
    //this.id = maxID+2;
    return componentName + this.id.toString();
  }

  static getPageID() {
    this.pageID++;
    return this.pageID.toString();
  }
}
