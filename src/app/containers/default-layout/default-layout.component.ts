import { Component, Input, OnInit } from "@angular/core";

import {
	Router,
	NavigationEnd,
	ActivatedRoute,
	RouteConfigLoadEnd
} from "@angular/router";
import {Storage} from "../../shared/storage";
import {Layout, Text} from "../../models/model";
import {PropertyGenerator} from "../../shared/property-generator";
import GraphEditorService from "../../services/graph-editor.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import ImportService from "../../services/import.service";

@Component({
	selector: "app-dashboard",
	templateUrl: "./default-layout.component.html",
	styleUrls: ["./default-layout.css"]
})
export class DefaultLayoutComponent implements OnInit {
	public navItems = null;
	public sidebarMinimized = true;
	private changes: MutationObserver;
	public element: HTMLElement = document.body;

  // test_data
  layout: any[] = ["Layout1", "Layout2", "Layout3"];
  genre: any[];
  categories: any[];
  components: any[];
  layout_selected: any = "Layout";
  genre_selected: any = "Genre";
  category_selected: any = "Category";
  component_selected: any = "Component";
  componentProperties: any[];

  storageComponents: any[] = Storage.components;
  private layoutComponent: any;
  private layoutPart: any;
  private files: any[];
	public userName = "undefined";

	constructor(private httpClient: HttpClient, private graphEditorService: GraphEditorService, private importService: ImportService) {
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
    this.component_selected = "Component";
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
    this.layoutComponent = new Layout({id: PropertyGenerator.getID(), selector: this.layout_selected, type: "layout", layout: "layout"});
    Storage.setLayoutComponent(this.layoutComponent);
    this.graphEditorService.bindComponent(this.layoutComponent);
  }

  addLayoutItem(sf) {
    document.getElementById("myForm").style.display = "none";
    const properties = sf.value;
    console.log(sf.value);
    properties["id"] = PropertyGenerator.getID();
    properties["selector"] = "text";
    properties["type"] = "text";
    properties["layout"] = this.layoutPart;
    const text = new Text(properties);
    if (this.layoutPart == "sidebar") {
      this.layoutComponent["sidebar"].push(text);
    } else if (this.layoutPart == "header") {
      console.log("push");
      this.layoutComponent["header"].push(text);
    } else if (this.layoutPart == "footer") {
      this.layoutComponent["footer"].push(text);
    } else if (this.layoutPart == "asidebar") {
      this.layoutComponent["asidebar"].push(text);
    }

    this.graphEditorService.bindComponent(text);
  }

  openForm(s) {
    this.layoutPart = s;
    console.log(s);
    document.getElementById("myForm").style.display = "block";
  }

  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }

  import() {
    this.importService.import();
  }

  showFiles(){
    this.files = this.importService.getFiles();
  }
  save() {
    this.graphEditorService.syncStorage();
  }
}

