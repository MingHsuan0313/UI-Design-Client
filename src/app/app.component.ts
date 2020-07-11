import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {UIComponent, Icon} from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('graphContainer') graphContainer: ElementRef;

  ngAfterViewInit() {
    const graph = new mxGraph(this.graphContainer.nativeElement);

    try {
      const parent = graph.getDefaultParent();
      graph.getModel().beginUpdate();

      const vertex1 = graph.insertVertex(parent, '1', 'Vertex 1', 0, 0, 200, 80);
      const vertex2 = graph.insertVertex(parent, '2', 'Vertex 2', 0, 0, 200, 80);
      var c:UIComponent=new Icon();
      (<Icon>c).text = "1";
      console.log((<Icon>c).text);
      graph.insertEdge(parent, '', '', vertex1, vertex2);
    } finally {
      graph.getModel().endUpdate();
      new mxHierarchicalLayout(graph).execute(graph.getDefaultParent());
    }
  }

}
