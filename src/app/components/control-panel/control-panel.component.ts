import { Component, OnInit } from "@angular/core";
import {Storage} from "../../shared/storage";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WizardComponent } from './wizard/wizard.component';


@Component({
  selector: "app-control-panel",
  templateUrl: "./control-panel.component.html",
  styleUrls: ["./control-panel.component.scss"]
})
export class ControlPanelComponent implements OnInit {

  // test_data
  layout: any[] = ["Layout1", "Layout2", "Layout3"];
  genre: any[];
  categories: any[];
  components: any[];
  layout_selected: any;
  genre_selected: any;
  category_selected: any;
  component_selected: any;
  componentProperties: any[];

  storageComponents: any[] = Storage.components;
  isHidden = true;
  constructor(private httpClient: HttpClient, public dialog: MatDialog) {

    this.genre_selected = "select genre";
    this.category_selected = "select category";
    this.layout_selected = "select layout";
    this.component_selected = "select component";
  }

  ngOnInit(): void {
    this.genre = Storage.getGenre();

    console.log(this.layout_selected);
  }

  setLayout(selection: any) {
    console.log(selection);
    this.layout_selected = selection;
  }

  setGenre(kind: any) {
    console.log(kind);
    this.genre_selected = kind;
    this.categories = Storage.getCategories(this.genre_selected);
  }

  setCategory(kind: any) {
    console.log(kind);
    this.category_selected = kind;
    this.components = Storage.getComponents(this.genre_selected, this.category_selected);
  }

  setComponent(kind: any) {
    console.log(kind);
    this.component_selected = kind;
  }


  fresh() {
    this.componentProperties = [];
  }

  show() {
    console.log(Storage.components);
  }

  connectServer() {
    const pageUICDL = Storage.getPageUICDL();
    console.log(JSON.stringify(pageUICDL));

    this.postPageUICDL(Storage.PageUICDL).subscribe(
      response => console.log(response["body"])
    );
  }
  postPageUICDL(PDL) {
    return this.httpClient.post("http://localhost:8080", PDL,
      { headers: new HttpHeaders().set("Content-Type", "application/json"),
        observe: "response", withCredentials: true, responseType: "text" }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WizardComponent, {

      hasBackdrop: true,
      data: {name: this.component_selected, properties: Storage.getComponentProperties(this.component_selected)}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
