import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ResolutionService } from 'src/app/services/resolution.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { EngineeringStatusService } from 'src/app/services/engineering-status.service';
import { ProductionStatusService } from 'src/app/services/production-status.service';
import { AuthService } from 'src/app/services/auth.service';
import { filter, take } from 'rxjs/operators';

export interface DataTableColumn {
  title: string;
  field: string;
  classes?: string[];
  responsiveFlag: any;
  responsiveTitle: any;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() public tableData: any;
  @Input() public allColumns: any;
  @Input() public tableConfig: any;
  @Input() public paginatorCount: any;
  @Input() public addColumnFlag: any;

  @Output() tableEvent = new EventEmitter<any>();
  @Output() tableCheckboxEvent = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  public displayedColumns: DataTableColumn[] | any;
  public columnsToDisplay: string[] = [];
  public columns: DataTableColumn[] = [];
  public isMobile = false;
  public selection = new SelectionModel<any>(true, []);
  selectedRowIndex = 0;
  dataSource: any;
  sort: any;
  currentUserDetails: any;
  userViewAccess: boolean;


  constructor(public engineeringService: EngineeringStatusService,
    public productionService: ProductionStatusService,
    private resolutionService: ResolutionService,
    public authService: AuthService) {
    this.tableData = new MatTableDataSource(this.tableData);
    this.applySelection();
    this.authService.getCurrentUser().pipe(
      take(1),
      filter((data: any) => data && data.length > 0)
    ).subscribe((data: any) => {
      this.currentUserDetails = data;
    });
    if (this.currentUserDetails[0].role === 'View') {
      this.userViewAccess = true;
    } else {
      this.userViewAccess = false;
    }
  }

  ngOnInit(): void {
    this.resolutionService.isMobile$.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
      this.setColumns();
      this.configureColumns();
    });
  }

  ngAfterViewInit() {
    this.setPaginator();
  }

  setPaginator(): void {
    if (this.tableData) {
      this.tableData.paginator = this.paginator;
      this.tableData.sort = this.sort;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tableData && !changes.tableData.firstChange) {
      this.tableData = new MatTableDataSource(changes.tableData.currentValue);
      this.setPaginator();
    }
    this.applySelection();
  }


  public applySelection() {
    if (this.tableData && this.tableData.data) {
      this.tableData.data.forEach((row: any) => {
        if (row.list && _.includes(row.list, row.dueDateItem)) {
          this.selection.select(row);
        }
      });
    }
  }

  public handleSelectChange(row: any): void {
    this.selection.toggle(row);
    this.tableCheckboxEvent.emit(row);
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.tableData.filter = filterValue;
    if (this.tableData.paginator) {
      this.tableData.paginator.firstPage;
    }
  }

  onSortData(sort: Sort) {
    let data = this.tableData.data.slice();
    if (sort.active && sort.direction !== '') {
      data = data.sort((a: any, b: any) => {
        const isAsc = sort.direction === 'asc';
        return this.compare(a[sort.active], b[sort.active], isAsc);
      });
    }
    this.tableData = data;
    this.tableData = new MatTableDataSource(this.tableData);
    this.setPaginator();
  }

  private compare(a: any, b: any, isAsc: any) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private setColumns() {
    this.columns = this.isMobile ? this.allColumns.mobile : this.allColumns.desktop;
  }

  private configureColumns() {
    this.columns = _.filter(this.columns, (column: DataTableColumn) => this.isColumnAvailable(column));
    this.columnsToDisplay = _.map(this.columns, (column: DataTableColumn) => column.title);
    if (this.tableConfig.selectionsColumn) {
      this.columnsToDisplay.unshift('select');
    }
    if (this.tableConfig.actions) {
      this.columnsToDisplay.push('actions');
    }

    if (this.addColumnFlag) {
      this.engineeringService.getColumns$.subscribe((columns: any) => {
        if (columns !== null) {
          this.columnsToDisplay = _.map(columns, (column: DataTableColumn) => column.title);
          this.displayedColumns = columns;
        }
        else {
          this.displayedColumns = this.columns;
        }
      });
    }
    else {
      this.displayedColumns = this.columns;
    }

  }

  private isColumnAvailable(column: DataTableColumn): boolean {
    // Role based column show on the data-table
    return true;
  }

  public getTotalActions(actions: any) {
    return _.filter(actions, (action: any) => action);
  }

  public showActionsMenu(): boolean {
    const totalActions = this.getTotalActions(this.tableConfig.actions).length;
    const maxVisible = 1;
    return this.isMobile && (totalActions > maxVisible);
  }

  public tableEventHandler(eventName: string, element?: any): void {
    this.tableEvent.emit({ eventName, data: element });
  }

}
