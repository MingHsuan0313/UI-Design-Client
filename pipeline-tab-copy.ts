import { Input, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete, MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import ServiceComponentService from 'src/app/services/serviceComponent/service-component.service';
import { AppState } from 'src/app/models/store/app.state';
import { Store } from '@ngrx/store';
import { Task } from 'src/app/models/wizard-task-dependency';
import { PipelineCreateTaskAction, PipelineDeleteTasksAction } from 'src/app/models/store/actions/pipelineTask.action';
import { tasksSelector } from 'src/app/models/store/selectors/PipelineStorageSelector';
import { IRInsertUIComponentAction } from 'src/app/models/store/actions/internalRepresentation.action';
import GraphEditorService from 'src/app/services/externalRepresentation/graph-editor.service';
import { UIComponentBuilder } from 'src/app/components/selab-wizard/UIComponentBuilder';
import { SelabWizardComponent } from 'src/app/components/selab-wizard/selab-wizard.component';
import { UIComponentConfig } from 'src/app/components/selab-wizard/uicomponent-config';
import { ReturnDataMenuComponent } from 'src/app/components/selab-wizard/return-data-menu/return-data-menu.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/components/utils/confirm-dialog/confirm-dialog.component';
import { SelabGlobalStorage } from 'src/app/models/store/globalStorage';
import { WizardTask } from 'src/app/models/wizardTask/TaskGraph.model';
import { BpelDesignerEditorService } from 'src/app/bpel-designer/services/bpel-designer-editor.service';

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
  @ViewChild('returnDataMenu') returnDataMenu: ReturnDataMenuComponent;
  constructor(private serviceComponentService: ServiceComponentService,
    public wizard: MatDialogRef<SelabWizardComponent>,
    public dialog: MatDialog,
    private store: Store<AppState>,
    private graphEditorService: BpelDesignerEditorService
  ) {
    this.returnData = {};
    this.alluiComponentTypes = UIComponentConfig.getAllComponentTypes();
    this.filtereduiComponentTypes = this.uiComponentCtrl.valueChanges.pipe(startWith(null),
      map((componentType: string | null) => componentType ? this._filter(componentType) : this.alluiComponentTypes.slice()));
  }

  nextPipe() {
    console.log("next pipe");
    // console.log(this.selecteduiComponentTypes);
    this.confirmDialog();
  }

  confirmDialog() {
    console.log('open confirm dialog');
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
            .setComponentType(componentType)
            .setIsRoot(false)
          currentTask.tasks.push(task);
        }
        this.wizard.close();
        this.startPipeline(currentTask);
      }
    })
  }

  startPipeline(currentTask: WizardTask) {
    let compositeComponents = ["card", "breadcrumb", "inputgroup", "form"];
    let taskGraph = SelabGlobalStorage.getTaskGraph();
    for (let index = 0; index < currentTask.tasks.length; index++) {
      let task = currentTask.tasks[index];
      taskGraph.setCurrentTask(task);
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
        autoFocus: true
      })
      wizardRef.afterClosed().subscribe(
        () => {
          console.log("closed...")
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
      this.returnDataMenu.render([
        {
          name: "t1"
        },
        {
          name: "t2"
        },
        {
          name: "t3"
        }
      ])
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