import { Component, OnInit } from '@angular/core';
import { Storage } from '../../shared/storage'

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.css']
})
export class PageEditorComponent implements OnInit {
  private pageUICDLList
  flag:boolean = false;
  constructor() { 
    this.pageUICDLList = Storage.pageUICDLList;
  }

  ngOnInit() {
  }

  addNewPage(){
    this.flag = !this.flag;
  }

}
