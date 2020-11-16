declare class mxGraphModel {
  constructor();
  cells: any;
  remove(cell);
  beginUpdate();
  endUpdate();

  clear();
}
