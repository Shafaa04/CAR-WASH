import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { LoginComponent } from 'src/app/layouts/login/login.component';
import { ReportService } from 'src/app/services/report.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Name', 'phone', 'carWashName', 'location', 'contact','packageName','price',
  'carName','washDate','washerName','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  loading: boolean = false;
  reportForm!: FormGroup;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private reportService: ReportService,
    private requestService:RequestService) { }
  ngOnInit(): void {
    this.configureForm();
    this.fetchAllRequest();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchAllRequest(){
    this.requestService.getAllRequest().subscribe((resp:any)=>{
      console.log(resp);
      
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    })
  }

  configureForm() {
    this.reportForm = new FormGroup({
      startDate1: new FormControl(null, Validators.required),
      endDate1: new FormControl(null, Validators.required),
    })
  }

  onSearch() {
    this.loading = true;
    const values = this.reportForm.value;

    // START DATE
    const startDate1 = new Date(values.startDate1);
    const year = startDate1.getFullYear();
    const month = String(startDate1.getMonth() + 1).padStart(2, '0'); 
    const day = String(startDate1.getDate()).padStart(2, '0'); 
    const formattedStartDate = `${year}-${month}-${day}`;
    

    // END DATE
    const endDate1 = new Date(values.endDate1);
    const year2 = endDate1.getFullYear();
    const month2 = String(endDate1.getMonth() + 1).padStart(2, '0'); 
    const day2 = String(endDate1.getDate()).padStart(2, '0'); 
    const formattedEndDate = `${year2}-${month2}-${day2}`;

    // FORMATED DATE
    const formattedValues = {
      startDate: formattedStartDate,
      endDate: formattedEndDate
    };

    
    
    this.reportService.getReportByDate(formattedValues).subscribe((resp:any)=>{
      console.log(resp);
      
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    })

  }


}
