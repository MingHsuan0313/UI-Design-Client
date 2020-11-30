import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, observable, of as observableOf } from 'rxjs';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { UIComponent } from 'src/app/models/ui-component-dependency';
import GraphEditorService from 'src/app/services/externalRepresentation/graph-editor.service';
import { SelabEditor } from 'src/app/models/externalRepresentation/selab-editor.model';

@Component({
  selector: 'app-component-info',
  templateUrl: './component-info.component.html',
  styleUrls: ['./component-info.component.css']
})
export class ComponentInfoComponent implements OnInit {
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<InformationNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<InformationNode, FileFlatNode>;
  database: InformationDatabase;

  constructor(private graphEditorServive: GraphEditorService) {
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
    console.log("initialize")
    let editors = this.graphEditorServive.editors; 
    editors.forEach((editor: SelabEditor,key: string)  => {
      console.log("hey")
      let grpah = editor.getGraph();
      grpah.addListener(mxEvent.CLICK, (sender, event) => {
        let selectedVertex = sender.selectionModel.cells[0];

        console.log('grpah being click')
        console.log(this);
        console.log('vertex being click');
        console.log(selectedVertex);
      })
    })
  }
  
  test() {
    console.log("Hello");
  }
  
  clear() {
    this.database = new InformationDatabase(JSON.stringify({}));
    this.database.dataChange.subscribe(data => this.dataSource.data = data);
  }

  update(uiComponent: UIComponent) {
    console.log("update")
    console.log(uiComponent)
    this.database = new InformationDatabase(JSON.stringify(uiComponent.getInfo()));
    this.database.dataChange.subscribe(data => this.dataSource.data = data);
  }
}


class InformationNode {
  children: InformationNode[];
  filename: string;
  type: any;
}

class FileFlatNode {
  constructor(
    public expandable: boolean, public filename: string, public level: number, public type: any) { }
}

class InformationDatabase {
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