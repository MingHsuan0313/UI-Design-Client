import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatTabGroup } from '@angular/material';
import { Store } from '@ngrx/store';
import { PageUICDL } from 'src/app/models/internalRepresentation/pageUICDL.model';
import { IRDeleteNDLPageAction, IRDeletePageUICDLAction, IRDeleteThemeAction, IRInitialNDLAction, IRInsertNDLPageAction, IRInsertPageUICDLAction, IRInsertThemeAction, IRRenamePageAction, IRRenameThemeAction } from 'src/app/models/store/actions/internalRepresentation.action';
import { AppState } from 'src/app/models/store/app.state';
import { pageImageSelector, themeSelector } from 'src/app/models/store/selectors/InternalRepresentationSelector';
import GraphEditorService from 'src/app/services/externalRepresentation/graph-editor.service';
import { TabNameDialogComponent } from '../tab-name-dialog/tab-name-dialog.component';
import { ThumbnailDialog } from '../thumbnail-dialog/thumbnail-dialog.component';

@Component({
  selector: 'app-theme-tabs',
  templateUrl: './theme-tabs.component.html',
  styleUrls: ['./theme-tabs.component.css']
})
export class ThemeTabsComponent implements OnInit {
  themes: any[];
  thumbnail: string;

  renameDialogOpen: boolean;
  selectedPageIndex = new FormControl(0);
  selectedThemeIndex = new FormControl(0);

  @ViewChild("themeTabGroup") themeTabGroup: MatTabGroup;
  @ViewChild("pageTabGroup") pageTabGroup: MatTabGroup;

  constructor(private store: Store<AppState>,
    private dialog: MatDialog,
    private thumbnailDialog: MatDialog,
    private graphEditorService: GraphEditorService
  ) {
    this.renameDialogOpen = false;
    this.themes = [];

    this.store.select(themeSelector())
      .subscribe((themes) => {
        this.themes = [];
        for (let index = 0; index < themes.length; index++) {
          this.themes.push({
            name: themes[index].name,
            id: themes[index].id,
            pages: themes[index].pages
          })
        }
        if(this.themes.length==0){
          console.log("Delete All")
          this.selectedThemeIndex.setValue(0)
          this.selectedPageIndex.setValue(0)
        }
      })
  }

  getSelectedTheme() {
    return this.themes[this.selectedThemeIndex.value];
  }

  getSelectedPage() {
    return this.getSelectedTheme().pages[this.selectedPageIndex.value];
  }

  changeTheme(targetIndex) {
    targetIndex = this.selectedThemeIndex.value;
    // change to the first page of theme
    let currentPageId = this.graphEditorService.getSelectedPageId();
    let targetPageId = this.getSelectedTheme()['pages'][0].id;
    this.graphEditorService.setSelectedThemeIndex(targetIndex);
    this.selectedPageIndex.setValue(0);
    this.graphEditorService.changePage(currentPageId, targetPageId);
  }

  changePage(targetIndex) {
    let currentPageId = this.themes[this.selectedThemeIndex.value]['pages'][this.selectedPageIndex.value].id;
    let targetPageId = this.themes[this.selectedThemeIndex.value]['pages'][targetIndex.index].id;
    // console.log(`change page\ncurrent page = ${currentPageId} target page = ${targetPageId}`);
    this.graphEditorService.changePage(currentPageId, targetPageId);
  }

  selectPage(index) {
    if(this.graphEditorService.navigation) {
      this.changePage({index:index});
    }
  }

  addTheme(imsMain: boolean) {
    let uuid = require('uuid');
    let themeId = `selab-theme-${uuid.v1()}`;
    let themeName = `theme-${uuid.v1().substr(2, 5)}`;
    let pageId = `selab-page-${uuid.v1()}`;
    let pageName = `page-${uuid.v1().substr(2, 5)}`;
    let pageUICDL = new PageUICDL(pageId); // internalRepresentation
    pageUICDL['name'] = pageName;

    this.store.dispatch(new IRInsertThemeAction(themeId, themeName));
    let theme = {
      name: themeName,
      id: themeId,
      index: this.themes.length - 1,
      pages: []
    }
    pageUICDL["themeId"] = themeId;
    this.store.dispatch(new IRInsertPageUICDLAction(this.themes.length - 1, pageUICDL, imsMain));
    this.store.dispatch(new IRInsertNDLPageAction(pageUICDL))
  }

  addPage() {
    let uuid = require('uuid');
    let pageId = `selab-page-${uuid.v1()}`;
    let pageName = `page-${uuid.v1().substr(2, 5)}`;
    let pageUICDL = new PageUICDL(pageId);
    pageUICDL['name'] = pageName;
    let themeId = this.themes[this.selectedThemeIndex.value].id;
    
    pageUICDL["themeId"] = themeId;
    this.store.dispatch(new IRInsertPageUICDLAction(this.selectedThemeIndex.value, pageUICDL, false));
    this.store.dispatch(new IRInsertNDLPageAction(pageUICDL))
    this.getSelectedTheme()['pages'] = this.themes[this.selectedThemeIndex.value].pages;
  }

  closeTheme(targetIndex: number) {
    // delete all pages under this specific theme first
    for (let index = 0; index < this.getSelectedTheme()['pages'].length; index++) {
      let page = this.getSelectedTheme()['pages'][index];
      this.store.dispatch(new IRDeletePageUICDLAction(this.selectedThemeIndex.value, index, page['id']));
      this.store.dispatch(new IRDeleteNDLPageAction(page["name"]))
    }

    // delete this specific theme
    this.store.dispatch(new IRDeleteThemeAction(targetIndex));
    if (targetIndex == this.selectedThemeIndex.value)
      this.selectedThemeIndex.setValue(0);
  }

  closePage(index: number) {
    // delete page
    let page = this.getSelectedTheme()['pages'][index];
    this.store.dispatch(new IRDeletePageUICDLAction(this.selectedThemeIndex.value, index, page['id']));
    this.store.dispatch(new IRDeleteNDLPageAction(page["name"]))

    if (index == this.selectedPageIndex.value) {
      this.selectedPageIndex.setValue(0);
      this.graphEditorService.clearGraphEditor();
    }
  }

  renamePage(targetIndex: number) {
    let page = this.getSelectedTheme()['pages'][targetIndex];

    let data = {
      tabName: page.name,
      themeName: this.getSelectedTheme()['name'],
      type: 'page'
    }

    this.renameDialogOpen = true;
    const dialogRef = this.dialog.open(TabNameDialogComponent, {
      data: data,
      autoFocus: true,
      disableClose: true
    })

    dialogRef.afterClosed()
      .subscribe(result => {
        this.renameDialogOpen = false;
        this.store.dispatch(new IRRenamePageAction(page['id'], result, this.selectedThemeIndex.value, targetIndex));
      })
  }

  renameTheme(targetIndex: number) {
    let theme = this.themes[targetIndex];

    let data = {
      tabName: theme.name,
      type: 'theme'
    }

    this.renameDialogOpen = true;
    const dialogRef = this.dialog.open(TabNameDialogComponent, {
      data: data,
      autoFocus: true,
      disableClose: true
    })

    dialogRef.afterClosed()
      .subscribe(result => {
        this.renameDialogOpen = false;
        this.store.dispatch(new IRRenameThemeAction(targetIndex, result));
      })

  }

  openThumbNail(pageIndex, event) {
    let pageId = this.getSelectedTheme()['pages'][pageIndex].id;
    let subscribtion = this.store.select(pageImageSelector(pageId))
      .subscribe(
        pageImage => {
          this.thumbnail = pageImage
          if (this.thumbnail) {
            const dialogRef = this.thumbnailDialog.open(ThumbnailDialog, {
              data: this.thumbnail,
              autoFocus: false,
              hasBackdrop: false,
              position: { top: String(event.clientY - 360) + 'px', left: String(event.clientX) + 'px' }
            });

            dialogRef.afterClosed().subscribe(result => {
            });
          }
        })
    subscribtion.unsubscribe();
  }

  closeThumbNail() {
    if(!this.renameDialogOpen) {
      this.thumbnailDialog.closeAll();
    }
  }

  ngOnInit() {
    this.store.dispatch(new IRInitialNDLAction());
    this.addTheme(true);
    this.graphEditorService.setSelectedPageId(this.themes[0].pages[0].id);
    this.graphEditorService.setSelectedThemeIndex(0);
  }
}