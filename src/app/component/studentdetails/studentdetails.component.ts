import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator,} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.css']
})
export class StudentdetailsComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'mark', 'grade'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
 
  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort)sort!: MatSort;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  mark: number;
  grade: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Anbu', mark: 23, grade: 'B'},
  {position: 2, name: 'Suriya', mark: 44, grade: 'A+'},
  {position: 3, name: 'Yokesh', mark: 36, grade: 'A'},
  {position: 4, name: 'Vishakan', mark: 39, grade: 'A'},
  {position: 5, name: 'Vimal', mark: 30, grade: 'B+'},
  {position: 6, name: 'Raj', mark: 20, grade: 'C+'},
  {position: 7, name: 'Sivi', mark: 14, grade: 'D+'},
  {position: 8, name: 'Siva', mark: 15, grade: 'C'},
  {position: 9, name: 'Kowshick', mark: 18, grade: 'C'},
  {position: 10, name: 'Mani', mark: 20, grade: 'C+'},
  {position: 11, name: 'Sathya', mark: 22, grade: 'C+'},
  {position: 12, name: 'Arun', mark: 24, grade: 'B'},
  {position: 13, name: 'Mugilan', mark: 26, grade: 'B'},
  {position: 14, name: 'Prasanth', mark: 28, grade: 'B'},
  {position: 15, name: 'Vasanth', mark: 30, grade: 'B+'},
  {position: 16, name: 'Mukesh', mark: 32, grade: 'B+'},
  {position: 17, name: 'Vicky', mark: 35, grade: 'A'},
  {position: 18, name: 'Hari', mark: 39, grade: 'A'},
  {position: 19, name: 'Munis', mark: 39, grade: 'A'},
  {position: 20, name: 'Naveen', mark: 40, grade: 'A'},
];
