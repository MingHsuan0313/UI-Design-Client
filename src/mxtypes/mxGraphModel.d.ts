declare class mxGraphModel {
  constructor();
  cells: any;
  remove(cell);
  add(parent,child,index);
  beginUpdate();
  endUpdate();
  createRoot();
  getCell();
  setRoot();
  getRoot();
  clear();
  getDefaultParent();
  getChildCount(cell);
  addCell(cell, parent, index, source?, target?);
}
