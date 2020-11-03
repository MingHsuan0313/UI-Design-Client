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
  isComposite: boolean = false;
  genere: string = ""; // CoreUI, Material...
  type: string = ""; // form, dropdown...
  category: string = ""; // informative, input control...
  uiComponent: UIComponent; // uiComponent being create

  constructor(
    public dialogRef: MatDialogRef<SelabHeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    
  }

  // receive data from dialog input
  initialization() {
    this.isPipeline = this.data.isPipeline;
    this.genere = this.data.genere;
    this.isComposite = this.data.isComposite;
    this.type = this.data.type;
    this.category = this.data.category;
    let uiComponentFactory: UIComponentFactory = new UIComponentFactory();
    this.uiComponent = uiComponentFactory.create(this.type);

  }
  
  checkWizardStatus() {
    let openCorrect = true;
    let description = "";
    console.log(this)
    if(this.genere == "Genre")
      description += "You need to choose Genre\n";
    if(this.category == "Category")
      description += "You need to choose Category\n";
    if(this.uiComponent == undefined)
      description += "You need to choose UI Component\n";

    console.log(description)
    if(description.length > 0) {
      this.dialogRef.close();
      alert(description);
      return false;
    }
    return true;
  }
  
  checkUIComponent() {
    console.log(this.uiComponent);
  }

  ngOnInit() {
    this.initialization();

    if(!this.checkWizardStatus()) 
      return;

    // composite component
    if(this.data.isComposite) {
      this.tabs = ["Build Component","Compose Component","Check Status","Bind Service","Generate Pipeline"];
    }
    // basic component
    else {
      this.tabs = ["Build Component","Check Status"];
    }
  }
}