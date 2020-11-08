import { Input, OnInit } from '@angular/core';
import { UIComponent } from 'src/app/models/ui-component-dependency';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete, MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UIComponentFactory } from '../uicomponent-factory';
import { ServiceComponentModel } from 'src/app/models/service-component-dependency';
import ServiceComponentService from 'src/app/services/serviceComponent/service-component.service';
import { PipelineDataMenuComponent } from './pipeline-data-menu/pipeline-data-menu.component';
import { SelabHeaderComponent } from '../../selab-header/selab-header.component';
import { AppState } from 'src/app/models/store/app.state';
import { Store } from '@ngrx/store';
import { Operation, Task } from 'src/app/models/wizard-task-dependency';
import { PipelineCreateOperationAction, PipelineCreateTaskAction, PipelineDeleteTasksAction } from 'src/app/models/store/actions/pipelineTaskAction/pipelineTask.action';
import { tasksSelector } from 'src/app/models/store/reducers/PipelineStorageSelector';
import { SelabWizardComponent } from '../selab-wizard.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../utils/confirm-dialog/confirm-dialog.component';
import { IRInsertUIComponentAction } from 'src/app/models/store/actions/internalRepresentationAction/internalRepresentation.action';
import { departmentReturn } from '../../fakeReturnData';

@Component({
  selector: 'pipeline-tab',
  templateUrl: './pipeline-tab.component.html',
  styleUrls: ['./pipeline-tab.component.css']
})
export class PipelineTabComponent implements OnInit {

  @Input() uiComponent: UIComponent;
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
  @ViewChild('returnDataMenu') dataMenu: PipelineDataMenuComponent;
  constructor(private serviceComponentService: ServiceComponentService,
    public wizard: MatDialogRef<SelabWizardComponent>,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.returnData = {};
    this.alluiComponentTypes = UIComponentFactory.getAllComponentTypes();
    this.filtereduiComponentTypes = this.uiComponentCtrl.valueChanges.pipe(
      startWith(null),
      map((componentType: string | null) => componentType ? this._filter(componentType) : this.alluiComponentTypes.slice()));
  }

  nextPipe() {
    console.log("next pipe");
    console.log(this.selecteduiComponentTypes);

  }

  confirmDialog() {
    const message = `Are you sure you want to store this UI Component into PageUICDL and start pipeline?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.store.dispatch(new IRInsertUIComponentAction(this.uiComponent));
        let serviceComponent = this.uiComponent.getServiceComponent();
        let operation = new Operation()
          .setName(serviceComponent.getName())
          .setClassName(serviceComponent.getClassName())
          .setServiceID(serviceComponent.getServiceID())
          .setReturnData(this.returnData);
        this.store.dispatch(new PipelineCreateOperationAction(operation));
        for (let index = 0; index < this.selecteduiComponentTypes.length; index++) {
          let componentType = this.selecteduiComponentTypes[index];

          let task = new Task()
            .setComponentType(componentType)
            .setOperation(operation);
          this.store.dispatch(new PipelineCreateTaskAction(task));
        }
        this.wizard.close();
        this.startPipeline();
      }
    })
  }

  startPipeline() {
    let compositeComponents = ["card", "breadcrumb", "inputgroup", "form"];

    let tasksObservable = this.store.select(tasksSelector());
    let tasks;
    tasksObservable.subscribe((data) => {
      tasks = data;
      let tasksCount = Object.keys(tasks).length;
      for (let index = 0; index < Object.keys(tasks).length; index++) {
        let isComposite = false;
        if (compositeComponents.indexOf(tasks[index].componentType) >= 0)
          isComposite = true;
        let wizardRef = this.dialog.open(SelabWizardComponent, {
          width: '55%',
          height: '65%',
          data: {
            isPipeline: true,
            isComposite: isComposite,
            type: tasks[index].componentType,
            operation: tasks[index].operation
          },
          disableClose: true,
          autoFocus: true
        })
        wizardRef.afterClosed().subscribe(
          () => {
            console.log("closed...")
            tasksCount--;
            if (tasksCount == 0) {
              console.log("all tasks done")
              this.store.dispatch(new PipelineDeleteTasksAction())
            }
          }
        )
      }
    })
  }

  ngOnInit() {
  }

  update() {
    console.log("pipeline tab update");
    let departmentOperationReturn = departmentReturn;

    this.serviceComponentService
      .queryReturnByServiceID("2")
      .subscribe((response) => {
        this.returnData = departmentOperationReturn;
        let operation = new Operation()
          .setServiceID(this.uiComponent.getServiceComponent().getServiceID())
          .setName(this.uiComponent.getServiceComponent().getName())
          .setReturnData(this.returnData)
          .setClassName(this.uiComponent.getServiceComponent().getClassName())

        // this.returnData = JSON.parse(response["body"]);
        this.dataMenu.update(operation);
      }, (err) => {
        console.log("error")
        console.log(err);
      })
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