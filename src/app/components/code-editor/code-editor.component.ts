import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import ServiceComponentService from 'src/app/services/serviceComponent/service-component.service';
import { CodeEditorDialogComponent } from '../code-editor-dialog/code-editor-dialog.component';
import XTerminalService from './x-terminal/x-terminal.service';

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
  className: string;
  isCompiling: boolean;
  logMessage: string;
   
  constructor(
    public dialogRef: MatDialogRef<CodeEditorDialogComponent>,
    private serviceComponentService: ServiceComponentService,
    private xterminalService: XTerminalService,
    @Inject(MAT_DIALOG_DATA)public data:any,
  ) {
    this.isCompiling = false;
    this.logMessage = "";
  }
  
  compileCode() {
    console.log("start compiling");
    this.isCompiling = true;
    this.logMessage = "";
    this.serviceComponentService.postEditedServiceComponent(this.code,this.className).subscribe(
      response => {
        console.log("get from eidit code");
        let responseObject = JSON.parse(response["body"]);
        console.log("using")
        this.isCompiling = false;
        this.logMessage = responseObject["log"];
        console.log("Hereee");
        console.log(responseObject);
        if(responseObject["statusCode"] == -1) {
          this.xterminalService.appendErrorMessage("Signature Isn't unique") ;
          return;
        }
        else if(responseObject["statusCode"] == 0) {
          this.xterminalService.appendErrorMessage(this.logMessage) ;
          return;
        }
        else if(responseObject["statusCode"] == 1) {
          this.xterminalService.appendSuccessMessage(this.logMessage) ;
          return;
        }
        this.serviceComponentService.triggerJenkinsBuild().subscribe(
          response => {
            console.log("trigger jenkins build");
            // console.log(response);
          }
        )
      }
    )
  
    // this.serviceComponentService
  }
  
  clearTerminal() {
    this.xterminalService.clearTerminal();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log("Hello dataa")
    console.log(this.data)
    this.code = this.data["code"];
    this.className = this.data["className"];
  }
}