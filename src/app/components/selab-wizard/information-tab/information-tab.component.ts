import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, Injectable, Input, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable, observable, of as observableOf } from 'rxjs';
import { CompositeComponent } from 'src/app/models/internalRepresentation/CompositeComponent.model';
import { UIComponent } from 'src/app/models/ui-component-dependency';

@Component({
  selector: 'information-tab',
  templateUrl: './information-tab.component.html',
  styleUrls: ['./information-tab.component.css']
})
export class InformationTabComponent implements OnInit, AfterViewInit {
  @Input() isPipeline: boolean;
  @Input() uiComponent: UIComponent;
  @Input() isComposite: boolean;
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<InformationNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<InformationNode, FileFlatNode>;
  database: InformationDatabase;


  constructor() {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  }

  transformer = (node: InformationNode, level: number) => {
    return new FileFlatNode(!!node.children, node.filename, level, node.type);
  }

  private _getLevel = (node: FileFlatNode) => node.level;
  private _isExpandable = (node: FileFlatNode) => node.expandable;
  private _getChildren = (node: InformationNode): Observable<InformationNode[]> => observableOf(node.children);

  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;

  ngOnInit() {
    console.log("Build Tab:" + this.isPipeline)
  }

  update() {
    console.log("Update");
    console.log(this.uiComponent.getInfo());
    this.database = new InformationDatabase(JSON.stringify(this.uiComponent.getInfo()));
    this.database.dataChange.subscribe(data => this.dataSource.data = data);
  }

  ngAfterViewInit() {
    // console.log("information tab active")
  }
}

export class InformationNode {
  children: InformationNode[];
  filename: string;
  type: any;
}
export class FileFlatNode {
  constructor(
    public expandable: boolean, public filename: string, public level: number, public type: any) { }
}

export class InformationDatabase {
  dataChange = new BehaviorSubject<InformationNode[]>([]);
  get data(): InformationNode[] { return this.dataChange.value; }
  constructor(componentData) {
    this.initialize(componentData);
  }
  initialize(componentData) {
    const dataObject = JSON.parse(componentData);
    const data = this.buildFileTree(dataObject, 0);
    this.dataChange.next(data);
  }
  buildFileTree(obj: { [key: string]: any }, level: number): InformationNode[] {
    return Object.keys(obj).reduce<InformationNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new InformationNode();
      node.filename = key;
      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }
      return accumulator.concat(node);
    }, []);
  }
}