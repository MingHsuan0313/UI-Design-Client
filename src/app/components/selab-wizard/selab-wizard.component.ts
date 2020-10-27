import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UIComponent } from 'src/app/models/ui-component-dependency';
import { SelabHeaderComponent } from '../selab-header/selab-header.component';
import { UIComponentFactory } from './uicomponent-factory';

@Component({
  selector: 'selab-wizard',
  templateUrl: './selab-wizard.component.html',
  styleUrls: ['./selab-wizard.component.scss']
})
export class SelabWizardComponent implements OnInit {

  tabs = [];
  isPipeline:boolean = false;
  genere: string = ""; // CoreUI, Material...
  type: string = ""; // form, dropdown...
  category: string = ""; // informative, input control...
  uiComponent: UIComponent; // uiComponent being create

  constructor(
    public dialogRef: MatDialogRef<SelabHeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    
  }

  initialization() {
    this.isPipeline = this.data.isPipeline;
    this.genere = this.data.genere;
    this.type = this.data.type;
    this.category = this.data.category;
  }

  ngOnInit() {
    this.initialization();
    let uiComponentFactory: UIComponentFactory = new UIComponentFactory();
    this.uiComponent = uiComponentFactory.create(this.type);
    console.log("Wizar start create ui component below");
    console.log(this.uiComponent);
    console.log("Open dialog accept data below");
    console.log(this.data);

    // composite component
    if(this.data.isComposite) {
      this.tabs = ["Build Component","Compose Component","Information","Bind Service","Pipeline"];
    }
    // basic component
    else {
      this.tabs = ["Build Component","Information"];
    }
  }
}