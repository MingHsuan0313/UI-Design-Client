import {Component, OnInit} from "@angular/core";
import {Storage} from "../../shared/storage";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import GraphEditorService from "../../services/graph-editor.service";
import {Layout, Text} from "../../models/model";
import {PropertyGenerator} from "../../shared/property-generator";


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
  private layoutComponent: any;
  private layoutPart: any;

  constructor(private httpClient: HttpClient, private graphEditorService: GraphEditorService) {


  }

  ngOnInit(): void {
    this.genre = Storage.getGenre();
  }

  setLayout(selection: any) {
    console.log(selection);
    this.layout_selected = selection;
    Storage.layout = this.layout_selected;
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
    this.component_selected = "";
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
    // console.log(JSON.stringify(pageUICDL));
    console.log("Show Internal Representation");
    console.log("Component List");
    console.log(Storage.components);
    console.log("Page UICDL");
    console.log(pageUICDL);

    this.postPageUICDL(Storage.PageUICDL).subscribe(
      response => console.log(response["body"])
    );
  }

  postPageUICDL(PDL) {
    return this.httpClient.post("http://localhost:8080", PDL,
      {
        headers: new HttpHeaders().set("Content-Type", "application/json"),
        observe: "response", withCredentials: true, responseType: "text"
      }
    );
  }

  apply() {
    // selector is now meaningless
    this.layoutComponent = new Layout({id: PropertyGenerator.getID(), selector: "layout", type: this.layout_selected});
    Storage.add(this.layoutComponent);
    this.graphEditorService.bindComponent(this.layoutComponent);
  }

  addLayoutItem(sf) {
    document.getElementById("myForm").style.display = "none";
    let properties = sf.value;
    console.log(sf.value);
    properties["id"] = PropertyGenerator.getID();
    properties["selector"] = "text";
    properties["type"] = "text";
    let text = new Text(properties);
    if (this.layoutPart == "sidebar") {
      this.layoutComponent["sidebar"].push(text);
    } else if (this.layoutPart == "header") {
      this.layoutComponent["header"].push(text);
    }

    this.graphEditorService.bindComponent(text);
  }

  openForm(s) {
    this.layoutPart = s;
    document.getElementById("myForm").style.display = "block";
  }

  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

}




