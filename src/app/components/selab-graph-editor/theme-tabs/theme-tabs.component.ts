import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatTabGroup } from '@angular/material';
import { Store } from '@ngrx/store';
import { PageUICDL } from 'src/app/models/internalRepresentation/pageUICDL.model';
import { IRDeletePageUICDLAction, IRDeleteThemeAction, IRInsertPageUICDLAction, IRInsertThemeAction, IRRenamePageAction, IRRenameThemeAction } from 'src/app/models/store/actions/internalRepresentation.action';
import { AppState } from 'src/app/models/store/app.state';
import { themeSelector } from 'src/app/models/store/selectors/InternalRepresentationSelector';
import GraphEditorService from 'src/app/services/externalRepresentation/graph-editor.service';
import { TabNameDialogComponent } from '../tab-name-dialog/tab-name-dialog.component';

@Component({
  selector: 'app-theme-tabs',
  templateUrl: './theme-tabs.component.html',
  styleUrls: ['./theme-tabs.component.css']
})
export class ThemeTabsComponent implements OnInit {
  themes: any[];
  //
  selectedPageIndex = new FormControl(0);
  selectedThemeIndex = new FormControl(0);

  selectedTheme: {}; // { index: number, name: string, id: string }
  selectedPage: {}; // { index: number, name: string, id: string }

  @ViewChild("themeTabGroup") themeTabGroup: MatTabGroup;
  @ViewChild("pageTabGroup") pageTabGroup: MatTabGroup;

  constructor(private store: Store <AppState>,
    private dialog: MatDialog,
    private graphEditorService: GraphEditorService
  ) {
    this.themes = [];

    this.store.select(themeSelector())
      .subscribe((themes) => {
        this.themes = [];
        for(let index = 0; index < themes.length; index++) {
          this.themes.push({
            name: themes[index].name,
            id: themes[index].id,
            pages: themes[index].pages
          })
        }
        console.log(this.themes)
    })
  }

  changeTheme(targetIndex) {
    console.log(`change theme ${this.selectedThemeIndex.value}`)
    targetIndex = this.selectedThemeIndex.value;
    this.selectedTheme = this.themes[targetIndex];
    // change to the first page of theme
    this.selectedPageIndex.setValue(0);
  }

  changePage(targetIndex) {
    console.log(targetIndex);
    console.log(this.selectedPageIndex.value);
    // console.log(`change page ${targetIndex}`);
    // this.selectedPageIndex.setValue(targetIndex.index);
    this.selectedPage = {
      name: this.selectedTheme['pages'][targetIndex.index].name,
      index: targetIndex,
      id: this.selectedTheme['pages'][targetIndex.index].id
    }
  }

  addTheme(imsMain: boolean) {
    let uuid = require('uuid');
    let themeId = `selab-theme-${uuid.v1()}`;
    let themeName = `theme-${uuid.v1().substr(2,5)}`;
    let pageId = `selab-page-${uuid.v1()}`;
    let pageName = `page-${uuid.v1().substr(2,5)}`;
    let pageUICDL = new PageUICDL(pageId); // internalRepresentation
    pageUICDL['name'] = pageName;

    this.store.dispatch(new IRInsertThemeAction(themeId, themeName));
    let theme = {
      name: themeName,
      id: themeId,
      index: this.themes.length - 1,
      pages: []
    }
    console.log(theme)
    this.store.dispatch(new IRInsertPageUICDLAction(this.themes.length - 1, pageUICDL, imsMain));
  }

  addPage() {
    let uuid = require('uuid');
    let pageId = `selab-page-${uuid.v1()}`;
    let pageName = `page-${uuid.v1().substr(2,5)}`;
    let pageUICDL = new PageUICDL(pageId);
    pageUICDL['name'] = pageName;

    this.store.dispatch(new IRInsertPageUICDLAction(this.selectedThemeIndex.value, pageUICDL, false));
    this.selectedTheme['pages'] = this.themes[this.selectedThemeIndex.value].pages;
  }

  closeTheme(targetIndex: number) {
    // delete all pages under this specific theme first
    for (let index = 0; index < this.selectedTheme['pages'].lenght; index++) {
      let page = this.selectedTheme['pages'][index];
      this.store.dispatch(new IRDeletePageUICDLAction(this.selectedThemeIndex.value,index, page['id']));
    }

    // delete this specific theme
    this.store.dispatch(new IRDeleteThemeAction(targetIndex));
    if(targetIndex == this.selectedThemeIndex.value)
      this.selectedThemeIndex.setValue(0);
  }

  closePage(index: number) {
    // delete page
    let page = this.selectedTheme['pages'][index];
    this.store.dispatch(new IRDeletePageUICDLAction(this.selectedThemeIndex.value, index, page['id']));
    this.selectedTheme = this.themes[this.selectedThemeIndex.value];

    if(index == this.selectedPageIndex.value)
      this.selectedPageIndex.setValue(0);
  }

  renamePage(targetIndex: number) {
    let page = this.selectedTheme['pages'][targetIndex];
    console.log("rename page")
    console.log(page);

    let data = {
      tabName: page.name,
      themeName: this.selectedTheme['name'],
      type: 'page'
    }

    const dialogRef = this.dialog.open(TabNameDialogComponent, {
      data: data,
      autoFocus: true,
      disableClose: true
    })

    dialogRef.afterClosed()
      .subscribe(result => {
        // this.selectedTheme['pages'][targetIndex]['name'] = result;
        this.store.dispatch(new IRRenamePageAction(page['id'], result, this.selectedThemeIndex.value, targetIndex));
        this.selectedTheme = this.themes[this.selectedThemeIndex.value];
      })
  }

  renameTheme(targetIndex: number) {
    let theme = this.themes[targetIndex];
    console.log("rename theme");
    console.log(theme)

    let data = {
      tabName: theme.name,
      type: 'theme'
    }

    const dialogRef = this.dialog.open(TabNameDialogComponent, {
      data: data,
      autoFocus: true,
      disableClose: true
    })

    dialogRef.afterClosed()
      .subscribe(result => {
        // this.selectedTheme['pages'][targetIndex]['name'] = result;
        this.store.dispatch(new IRRenameThemeAction(targetIndex, result));
      })

  }

  ngOnInit() {
    this.addTheme(true);
    this.selectedTheme = this.themes[0];
  }
}