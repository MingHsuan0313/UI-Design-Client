import { Component, OnInit } from '@angular/core';
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage';
import { TaskGraph } from 'src/app/models/wizardTask/TaskGraph.model';
import { Edge, Node, ClusterNode, Layout } from '@swimlane/ngx-graph';
import { nodes, clusters, links } from './data';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent implements OnInit {
  taskGraph: TaskGraph;

  layout: string = 'dagreCluster';
  nodes: Node[] = nodes;
  links: Edge[] = links;

  constructor() { }

  show() {
    this.taskGraph.traverse();
  }

  showTaskGraph() {
    console.log(this.taskGraph);
    console.log(this.taskGraph.convertToNgxGraph());
  }

  ngOnInit() {
    console.log("Task status initialization");
    this.taskGraph = SelabGlobalStorage.getTaskGraph();
    let storage = this.taskGraph.convertToNgxGraph();
    this.nodes = storage.nodes;
    this.links = storage.edges;
  }
}
