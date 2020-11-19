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
  }

  ngOnInit() {

  }

}


