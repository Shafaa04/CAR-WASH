import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CarwashService } from 'src/app/services/carwash.service';
import { ReportService } from 'src/app/services/report.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-car-wash-report',
  templateUrl: './car-wash-report.component.html',
  styleUrls: ['./car-wash-report.component.css']
})
export class CarWashReportComponent implements OnInit{

  displayedColumns: string[] = ['id', 'Name', 'phone','packageName','price',
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
    private requestService:RequestService,
    private carwashService:CarwashService){}
  ngOnInit(): void {
    this.configureForm();
    this.fetchRequestByCarWash()
 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  configureForm() {
    this.reportForm = new FormGroup({
      startDate1: new FormControl(null, Validators.required),
      endDate1: new FormControl(null, Validators.required),
    })
  }

  fetchRequestByCarWash(){
    this.carwashService.getCarWashByUserId(sessionStorage.getItem('user_id')).subscribe((resp:any)=>{
      this.requestService.getRequestByCarWash(resp.carWashId).subscribe((resp:any)=>{
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
        
      })
    })

  }

  onSearch(){

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

    this.carwashService.getCarWashByUserId(sessionStorage.getItem('user_id')).subscribe((resp:any)=>{
      // console.log(resp.carWashId);
      this.reportService.getReportByDateByCarWash(resp.carWashId,formattedValues).subscribe((resp:any)=>{
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
        
      })
      
    })


  }

}
