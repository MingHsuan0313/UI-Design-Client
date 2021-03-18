import { Input, OnInit } from '@angular/core';
import { UIComponent } from 'src/app/models/ui-component-dependency';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete, MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import ServiceComponentService from 'src/app/services/serviceComponent/service-component.service';
import { PipelineDataMenuComponent } from './pipeline-data-menu/pipeline-data-menu.component';
import { AppState } from 'src/app/models/store/app.state';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models/wizard-task-dependency';
import { PipelineCreateTaskAction, PipelineDeleteTasksAction } from 'src/app/models/store/actions/pipelineTask.action';
import { tasksSelector } from 'src/app/models/store/selectors/PipelineStorageSelector';
import { SelabWizardComponent } from '../selab-wizard.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../utils/confirm-dialog/confirm-dialog.component';
import { IRInserSumdlServiceReturn, IRInsertSumdlServiceAction, IRInsertUIComponentAction } from 'src/app/models/store/actions/internalRepresentation.action';
import GraphEditorService from 'src/app/services/externalRepresentation/graph-editor.service';
import { UIComponentBuilder } from 'src/app/components/selab-wizard/UIComponentBuilder';
import { UIComponentConfig } from '../uicomponent-config';
import { timeStamp } from 'console';
import { ReturnDataMenuComponent } from '../return-data-menu/return-data-menu.component';
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage';
import { TaskState, WizardTask } from 'src/app/models/wizardTask/TaskGraph.model';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';
import { ServiceComponentModel } from 'src/app/models/service-component-dependency';

@Component({
  selector: 'pipeline-tab',
  templateUrl: './pipeline-tab.component.html',
  styleUrls: ['./pipeline-tab.component.css']
})
export class PipelineTabComponent implements OnInit {

  @Input() uiComponentBuilder: UIComponentBuilder;
  returnData: {};

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  uiComponentCtrl = new FormControl();
  filtereduiComponentTypes: Observable<string[]>;
  selecteduiComponentTypes: string[] = [];
  alluiComponentTypes: string[] = [];

  @ViewChild('componentTypeInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  // @ViewChild('returnDataMenu') dataMenu: PipelineDataMenuComponent;
  @ViewChild('returnDataMenu') returnDataMenu: ReturnDataMenuComponent;
  constructor(private serviceComponentService: ServiceComponentService,
    public wizard: MatDialogRef<SelabWizardComponent>,
    public dialog: MatDialog,
    private statusDialog: MatDialog,
    private store: Store<AppState>,
    private graphEditorService: GraphEditorService
  ) {
    this.returnData = {};
    this.alluiComponentTypes = UIComponentConfig.getAllComponentTypes();
    this.filtereduiComponentTypes = this.uiComponentCtrl.valueChanges.pipe(
      startWith(null),
      map((componentType: string | null) => componentType ? this._filter(componentType) : this.alluiComponentTypes.slice()));
  }

  closeWizard() {
    let currentTask = SelabGlobalStorage.getTaskGraph().currentTask;
    this.wizard.close(currentTask);
  }

  nextPipe() {
    console.log("next pipe");
    console.log(this.selecteduiComponentTypes);
    this.confirmDialog();
  }

  confirmDialog() {
    const message = `Are you sure you want to store this UI Component into PageUICDL and start pipeline?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      let currentTask = SelabGlobalStorage.getTaskGraph().currentTask;
      if (dialogResult == true) {
        let id = this.graphEditorService.getSelectedPageId();
        let uiComponent = this.uiComponentBuilder.build();
        this.store.dispatch(new IRInsertUIComponentAction(id, uiComponent));
        this.graphEditorService.bindComponent(uiComponent);
        let serviceComponent = uiComponent.getServiceComponent();
        for (let index = 0; index < this.selecteduiComponentTypes.length; index++) {
          let componentType = this.selecteduiComponentTypes[index];
          let task = new WizardTask()
            .setService(this.uiComponentBuilder.getServiceComponent() as ServiceComponentModel)
            .setComponentType(componentType)
            .setState(TaskState['undo'])
            .setParentTask(currentTask)
            .setIsRoot(false);
          currentTask.tasks.push(task);
        }
        this.wizard.close(currentTask);
        this.startPipeline(currentTask);
      }
    })
  }

  startPipeline(currentTask: WizardTask) {
    this.store.dispatch(new IRInsertSumdlServiceAction(this.graphEditorService.selectedPageId, this.uiComponentBuilder.serviceComponent['name']));
    let compositeComponents = ["card", "inputgroup", "form"];
    let taskGraph = SelabGlobalStorage.getTaskGraph();
    for (let index = currentTask.tasks.length - 1; index >= 0; index--) {
      let task = currentTask.tasks[index];
      taskGraph.taskStack.push(task);
      let isComposite = false;
      if (compositeComponents.indexOf(task.componentType) >= 0)
        isComposite = true;
      console.log('hello');
      let wizardRef = this.dialog.open(SelabWizardComponent, {
        width: '55%',
        height: '65%',
        data: {
          isPipeline: true,
          isComposite: isComposite,
          type: task.componentType,
          service: task.service
        },
        disableClose: true,
        // autoFocus: true
      })
      wizardRef.afterClosed().subscribe(
        (task: WizardTask) => {
          task.finish();
          SelabGlobalStorage.taskGraph.next();
        }
      )
    }
  }

  ngOnInit() {
  }

  update() {
    console.log(this.uiComponentBuilder.serviceID);
    console.log("pipeline tab update");
    if (this.uiComponentBuilder.serviceID != undefined) {
      this.returnDataMenu.render(this.uiComponentBuilder.serviceComponent as ServiceComponentModel)
    }
  }

  add(event: MatChipInputEvent): void {
    // Add component only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our UI Component
      if ((value || '').trim()) {
        this.selecteduiComponentTypes.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.uiComponentCtrl.setValue(null);
    }
  }

  remove(componentType: string): void {
    const index = this.selecteduiComponentTypes.indexOf(componentType);

    if (index >= 0) {
      this.selecteduiComponentTypes.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selecteduiComponentTypes.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.uiComponentCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alluiComponentTypes.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}