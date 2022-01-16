
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  imports: [HttpClientModule, MatSelectModule, MatCheckboxModule, BrowserAnimationsModule, MatInputModule, MatFormFieldModule,
    MatButtonModule, MatSidenavModule, MatListModule, MatIconModule, MatCheckboxModule, MatDialogModule, MatCardModule,
    MatProgressSpinnerModule, MatExpansionModule, MatTabsModule, MatBadgeModule, MatSortModule,
    MatToolbarModule, MatTableModule, MatSnackBarModule, MatInputModule, MatInputModule, MatMenuModule, DragDropModule,
    MatProgressBarModule, MatChipsModule, MatPaginatorModule, MatTooltipModule, MatGridListModule,
    MatAutocompleteModule, MatDatepickerModule],
  exports: [BrowserAnimationsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSidenavModule, MatDialogModule,
    MatInputModule, MatSelectModule, MatExpansionModule, MatTabsModule, MatBadgeModule,
    MatListModule, MatIconModule, MatCheckboxModule, MatCardModule, MatProgressSpinnerModule, MatSnackBarModule, MatFormFieldModule,
    MatToolbarModule, MatTableModule, MatMenuModule, DragDropModule, MatSortModule,
    MatProgressBarModule, MatChipsModule, MatPaginatorModule, MatTooltipModule, MatGridListModule],
})
export class AngularMaterialModule { }
