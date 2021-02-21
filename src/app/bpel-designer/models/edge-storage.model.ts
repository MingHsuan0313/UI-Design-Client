export default class EdgeStorage {
  edge: any;
  id: string;
  parentID: string;

  srcVertex: any;
  targetVertex: any;

  source: string;
  target: string;
  url: string;

  constructor(edge) {
    this.edge = edge;
    this.id = edge['id'];
    this.parentID = this.edge['parent']['id'];
    this.srcVertex = this.edge['source'];
    this.targetVertex = this.edge['target'];
    this.source = edge['source']['value'];
    this.target = edge['target']['value'];
    this.url = edge['value'];
  }
}