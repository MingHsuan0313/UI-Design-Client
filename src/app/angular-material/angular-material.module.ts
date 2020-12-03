import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatListModule } from "@angular/material";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTreeModule } from '@angular/material/tree'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips'; 
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatIcon } from '@angular/material'; 
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatInputModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTabsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTreeModule,
    MatDividerModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule,
    MatToolbarModule
  ],
  declarations: [],
  exports:[
    CommonModule,
    MatListModule,
    MatInputModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTabsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTreeModule,
    MatDividerModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule,
    MatToolbarModule
  ]
})
export class AngularMaterialModule { }
