import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'

})
export class AppComponent implements OnInit {
  constructor(private matIconRegistry: MatIconRegistry,private domSanitizer:DomSanitizer) {
    this.matIconRegistry
      .addSvgIcon('zoomIn',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/zoom_in-24px.svg'))
      .addSvgIcon('zoomOut',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/zoom_out-24px.svg'))
      .addSvgIcon('delete',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/delete-24px.svg'))
      .addSvgIcon('undo',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/undo-24px.svg'))
      .addSvgIcon('redo',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/redo-24px.svg'))
      .addSvgIcon('close',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/close-24px.svg'))
      .addSvgIcon('setting',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/settings-24px.svg'))
      .addSvgIcon('note',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/notes-24px.svg'))
      .addSvgIcon('navigation',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/navigation-24px.svg'))
      .addSvgIcon('code',this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icon/code-24px.svg'))
  }
  ngOnInit() {

  }
}


