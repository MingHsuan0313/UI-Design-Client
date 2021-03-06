import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, Injectable, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, observable, of as observableOf } from 'rxjs';
import { CompositeComponent } from 'src/app/models/internalRepresentation/CompositeComponent.model';
import { IRInsertUIComponentAction } from 'src/app/models/store/actions/internalRepresentation.action';
import { PipelineCreateOperationAction } from 'src/app/models/store/actions/pipelineTask.action';
import { AppState } from 'src/app/models/store/app.state';
import { ServiceComponentModel } from 'src/app/models/service-component-dependency';
import { UIComponent } from 'src/app/models/ui-component-dependency';
import { UIComponentBuilder } from 'src/app/components/selab-wizard/UIComponentBuilder';
import GraphEditorService from 'src/app/services/externalRepresentation/graph-editor.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../utils/confirm-dialog/confirm-dialog.component';
import { SelabWizardComponent } from '../selab-wizard.component';
import { UIComponentFactory } from '../uicomponent-factory';

@Component({
  selector: 'information-tab',
  templateUrl: './information-tab.component.html',
  styleUrls: ['./information-tab.component.css']
})
export class InformationTabComponent implements OnInit, AfterViewInit {
  @Input() isPipeline: boolean;
  @Input() uiComponentBuilder: UIComponentBuilder;
  @Input() isComposite: boolean;
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<InformationNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<InformationNode, FileFlatNode>;
  database: InformationDatabase;


  constructor(private store: Store<AppState>,
    public dialog: MatDialog,
    public wizard: MatDialogRef<SelabWizardComponent>,
    private graphEditorService: GraphEditorService
  ) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  }

  finish() {
    this.confirmDialog();
  }

  confirmDialog() {
    const message = `Are you sure you want to store this UI Component into PageUICDL?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData

    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        let id = this.graphEditorService.getSelectedPageId();
        console.log("start creating");
        console.log(this.uiComponentBuilder);
        let uiComponent = this.uiComponentBuilder.build();
        this.store.dispatch(new IRInsertUIComponentAction(id,uiComponent));
        this.graphEditorService.bindComponent(uiComponent);
        this.wizard.close();
      }
    })
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
    // uiComponent;
    this.database = new InformationDatabase(JSON.stringify(UIComponentFactory.getInfo(this.uiComponentBuilder)));
    this.database.dataChange.subscribe(data => this.dataSource.data = data);
  }  

  ngAfterViewInit() {
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