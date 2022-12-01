import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavComponent } from './elements/side-nav/side-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from "@angular/common/http";
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { TableComponent } from './elements/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogComponent } from './elements/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SubjectDetailsComponent } from './elements/subject-details/subject-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FilterComponent } from './filter/filter.component';
@NgModule({
  declarations: [FilterComponent,
    NotFoundComponent,
    SideNavComponent,
    TableComponent,
    DialogComponent,
    SubjectDetailsComponent,

  ],
  imports: [
    MatDialogModule,
    CommonModule,
    MatProgressBarModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatListModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatNativeDateModule,
    MatTabsModule,
    MatExpansionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ], exports: [
    FilterComponent,
    DialogComponent,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    SideNavComponent,
    TableComponent,
    SubjectDetailsComponent,
    MatProgressBarModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatListModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatNativeDateModule,
    MatTabsModule,
    MatExpansionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
  ]
})
export class SharedModule { }
