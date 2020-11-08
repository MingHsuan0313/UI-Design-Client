import { Input, OnInit } from '@angular/core';
import { UIComponent } from 'src/app/models/ui-component-dependency';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete, MatDialogRef } from '@angular/material';
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
import { PipelineCreateOperationAction, PipelineCreateTaskAction } from 'src/app/models/store/actions/pipelineTaskAction/pipelineTask.action';

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
    public dialogRef: MatDialogRef<SelabHeaderComponent> ,
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
    let serviceComponent = this.uiComponent.getServiceComponent();
    let operation = new Operation()
                          .setName(serviceComponent.getName())
                          .setClassName(serviceComponent.getClassName())
                          .setServiceID(serviceComponent.getServiceID())
                          .setReturnData(this.returnData);
    console.log(operation)
    this.store.dispatch(new PipelineCreateOperationAction(operation));
    for(let index = 0;index < this.selecteduiComponentTypes.length;index++) {
      let componentType = this.selecteduiComponentTypes[index];
      let task = new Task()
                      .setComponentType(componentType)
                      .setOperation(operation);
      console.log(task)
      this.store.dispatch(new PipelineCreateTaskAction(task));
    }
    console.log('ttttt')
  }

  ngOnInit() {
  }
  
  update() {
    let testingObj = {
      "department": {
        "name": "",
        "description": "",
        "category": {
          "item": {
            "name": "",
            "description": "",
            "id": ""
          },
          "name": "",
          "id": ""
        }
      }
    }
    this.serviceComponentService
      .queryReturnByServiceID("2")
      .subscribe((response) => {
        console.log("pipeline-tab");
        
        // this.returnData = JSON.parse(response["body"]);
        this.returnData = testingObj;
        console.log(response["body"])
        console.log(this.returnData);
        this.dataMenu.update(this.returnData,this.uiComponent.getServiceComponent());
        console.log("Hello World");
      },(err) => {
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
