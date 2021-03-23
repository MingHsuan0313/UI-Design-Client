import {Injectable} from '@angular/core';
import { IRAddNDLEdgeAction, IRClearNDLThemeEdgeAction } from 'src/app/models/store/actions/internalRepresentation.action';
import { NDLSelector, pageUICDLSelector, projectNameSelector } from "src/app/models/store/selectors/InternalRepresentationSelector";
import GraphEditorService from '../../services/externalRepresentation/graph-editor.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/store/app.state';
import ExportService from '../../services/internalRepresentation/export.service';
@Injectable({
  providedIn: 'root'
})

export default class NavigationService {



  constructor
  (private graphEditorService: GraphEditorService,
   private store: Store<AppState>,
   private exportService: ExportService){

  }

  storeNDL(inNavigationMode){
    console.log(inNavigationMode)
    if(inNavigationMode=="theme"){
      this.store.dispatch(new IRClearNDLThemeEdgeAction(this.graphEditorService.selectedThemeIndex))
    }
    let pages = {};
    let cells = this.graphEditorService.getGraphModel().cells;
    let subscribtion = this.store.select(pageUICDLSelector())
      .subscribe((pageUICDLs) => {
        let keys = Object.keys(pageUICDLs);
        for(let index = 0;index < keys.length;index++) {
          let key = keys[index];
          let page = {
            'name': pageUICDLs[key].name,
            'id': pageUICDLs[key].id
          }
          pages[pageUICDLs[key].id] = page;
        }
        keys = Object.keys(cells);

        for(let index = 0;index < keys.length;index++) {
          let key = keys[index];
          if(cells[key]['edge'] == true) {
            console.log(cells[key]);
            let sourcePageId = cells[key]['source']['parent']['pageId'];
            console.log(cells[key])
            console.log(sourcePageId)
            console.log(pages)
            let source = {
              'pageId': sourcePageId,
              'pageName': pages[sourcePageId]['name'],
              'componentSelector': cells[key]['source']['parent']['selector'] 
            }
            let targetPageId = cells[key]['target']['pageId'];
            let target = {
              'pageId': targetPageId,
              'pageName': pages[targetPageId]['name'], 
              'componentSelector': cells[key]['target']['selector'] 
            }

            console.log(source);
            console.log(target);
            this.store.dispatch(new IRAddNDLEdgeAction(
              pages[sourcePageId]['name'], 
              {
                "source": source,
                "target": target,
                "parameter": cells[key].value
              })
            )
          }
        }
      })
    subscribtion.unsubscribe();
    console.log(cells);
    let exportNDL;
    let exportProjectName;
    this.store.select(NDLSelector()).subscribe(
      ndl => exportNDL = ndl )
    this.store.select(projectNameSelector()).subscribe(
      projectName => exportProjectName = projectName
    )
    this.exportService.postNDL(exportProjectName, exportNDL);
  }

  storePartialNDL(){

  } 


}
