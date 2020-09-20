import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import ServiceComponentService from 'src/app/services/service-component.service';
import { CodeEditorDialogComponent } from '../code-editor-dialog/code-editor-dialog.component';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit {
  editorOptions = {theme: 'vs-dark', language: 'java'};
  code: string = 
  `
  "\npublic void itemHistorySplit(String iid, User user, Integer split) {\n    readAllEvent();\n    readAllReason();\n    ItemHistory itemHistory = new ItemHistory(null, user);\n    itemHistory.setAdjust(split);\n    DatabaseObject itemHistoryDatabaseObject = DatabaseObject.initMethod(\"ItemHistory\");\n    itemHistoryDatabaseObject.putString(\"iid\", iid);\n    itemHistoryDatabaseObject.putDate(\"date\", itemHistory.getDate());\n    itemHistoryDatabaseObject.putString(\"event\", eventMap.get(\"Item split\"));\n    itemHistoryDatabaseObject.putInteger(\"adjust\", itemHistory.getAdjust());\n    itemHistoryDatabaseObject.putString(\"reason\", \"\");\n    itemHistoryDatabaseObject.putString(\"uid\", user.getId().toString());\n    itemHistoryDatabaseObject.putString(\"comment\", \"\");\n    manager.DatabaseManager.save(itemHistoryDatabaseObject);\n}"
  `
   
  constructor(
    public dialogRef: MatDialogRef<CodeEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any,
  ) {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log("Hello dataa")
    console.log(this.data)
    this.code = this.data.code;
  }
}