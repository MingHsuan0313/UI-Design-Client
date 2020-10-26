import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelabHeaderComponent } from '../selab-header/selab-header.component';

@Component({
  selector: 'selab-wizard',
  templateUrl: './selab-wizard.component.html',
  styleUrls: ['./selab-wizard.component.scss']
})
export class SelabWizardComponent implements OnInit {

  links = [];
  isPipeline:boolean = false;
  genere: string = ""; // CoreUI, Material...
  type: string = ""; // form, dropdown...
  category: string = ""; // informative, input control...

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
    console.log("Open dialog accept data below");
    console.log(this.data);
    this.initialization();

    // composite component
    if(this.data.isComposite) {
      this.links = ["Build","Compose Component","Information","Bind Service","Pipeline"];
    }
    // basic component
    else {
      this.links = ["Build","Information"];
    }
  }
}