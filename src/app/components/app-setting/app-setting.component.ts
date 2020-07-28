import { Component, OnInit } from "@angular/core";
import GraphEditorService from "../../services/graph-editor.service";

@Component({
  selector: "app-setting",
  templateUrl: "./app-setting.component.html",
  styleUrls: ["./app-setting.component.scss"]
})
export class AppSettingComponent implements OnInit {

  files: any[] = [];
  constructor(private graphEditorService: GraphEditorService) { }

  ngOnInit() {

  }

  insertArrow() {
    // this.graphEditorService.addArrow();
  }

  onsubmit() {
    const file = <HTMLInputElement>document.getElementById("pictures");
    for (let i = 0; i < file.files.length; i++) {
      this.files.push(file.files.item(i));
    }

    console.log(this.files);
  }
}
