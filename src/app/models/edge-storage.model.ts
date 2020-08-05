import NavigationService from '../services/navigation.service';

export default class EdgeStorage {
  edge: any;
  id: string;
  parentID: string;
  source: string;
  target: string;
  url: string;
  private navigationService: NavigationService;

  constructor(edge) {
    this.edge = edge;
    this.id = edge['id'];
    this.parentID = this.edge['parent']['id'];
    this.source = edge['source']['value'];
    this.target = edge['target']['value'];
    this.url = edge['value'];
  }

  sync() {
    this.url = this.edge['value'];
    this.navigationService = new NavigationService();
    this.navigationService.createNavigationComponent(this.source, this.url, this.target);
  }
}
