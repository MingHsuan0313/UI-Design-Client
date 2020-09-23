import NavigationService from '../../services/navigation.service';

export class EdgeStorage {
  edge: any;
  id: string;
  parentID: string;

  srcVertex: any;
  targetVertex: any;

  source: string;
  target: string;
  url: string;
  private navigationService: NavigationService;

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

  sync() {
    this.url = this.edge['value'];
    this.source = this.edge['source']['value'];
    this.target = this.edge["target"]["value"];
    this.navigationService = new NavigationService();
    this.navigationService.createNavigationComponent(this.source, this.url, this.target);
  }
}
