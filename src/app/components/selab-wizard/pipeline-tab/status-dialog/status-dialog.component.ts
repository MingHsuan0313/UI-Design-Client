import { Component, OnInit } from '@angular/core';
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage';
import { TaskGraph } from 'src/app/models/wizardTask/TaskGraph.model';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent implements OnInit {
  taskGraph: TaskGraph;
  constructor() { }

  show() {
    this.taskGraph.traverse();
  }

  showTaskGraph() {
    console.log(this.taskGraph);
  }

  ngOnInit() {
    console.log("Task status initialization");
    this.taskGraph = SelabGlobalStorage.getTaskGraph();
  }
}
