import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from 'src/app/layouts/login/login.component';
import { CarwashService } from 'src/app/services/carwash.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phone', 'carName', 'packageName', 
  'washDate', 'price', 'name', 'bookingStatus', 'paymentStatus', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  loading: boolean = true;
  requestForm!: FormGroup;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private requestService: RequestService,
    private dialog: MatDialog,
    private carwashService: CarwashService,
    private employeeService: EmployeeService
  ) { }
  ngOnInit(): void {
    this.fetchRequest();
    this.configureForm();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  employees: any;
  fetchRequest() {
    this.carwashService.getCarWashByUserId(sessionStorage.getItem('user_id')).subscribe((resp: any) => {
      this.requestService.getRequestByCarWash(resp.carWashId).subscribe((resp: any) => {
   
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      });
      this.employeeService.getEmployeeByCarWashID(resp.carWashId).subscribe((resp: any) => {
        this.employees = resp;

      })
    })

  }



  configureForm() {
    this.requestForm = new FormGroup({
      washBookingId: new FormControl(null),
      washDate: new FormControl(null),
      bookingStatus: new FormControl(null),
      carWashData: new FormControl(null),
      customerData: new FormControl(null),
      employeeAloosha: new FormControl(null, Validators.required),
      message: new FormControl(null),
      washPackageData: new FormControl(null),
      paymentStatus: new FormControl(null)
    })
  }



  openDialog(row: any) {
    this.requestForm = new FormGroup({
      washBookingId: new FormControl(row.washBookingId),
      washDate: new FormControl(row.washDate),
      bookingStatus: new FormControl(1),
      carWashData: new FormControl(row.carWashData),
      customerData: new FormControl(row.customerData),
      employeeAloosha: new FormControl(row.employeeAloosha),
      message: new FormControl(row.message),
      washPackageData: new FormControl(row.washPackageData),
      paymentStatus: new FormControl(1),
    })

    let dialogRef = this.dialog.open(this.distributionDialog, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (result !== 'no') {
          const enabled = "Y"

        } else if (result === 'no') {
        }
      }
    })

  }

  OnConfirm() {

    Swal.fire({
      title: "Confirm Order?",
      text: "Are you sure you want to Confirm Order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {

        const id = this.requestForm.value.washBookingId;
        const values = this.requestForm.value;

        this.requestService.editRequest(id, values).subscribe((resp: any) => {
          this.reload()
          this.alert();
        })

      }
    });


  }

  cancel(row: any) {
    this.requestForm = new FormGroup({
      washBookingId: new FormControl(row.washBookingId),
      washDate: new FormControl(row.washDate),
      bookingStatus: new FormControl(2),
      carWashData: new FormControl(row.carWashData),
      customerData: new FormControl(row.customerData),
      employeeAloosha: new FormControl(row.employeeAloosha),
      message: new FormControl(row.message),
      washPackageData: new FormControl(row.washPackageData),
      paymentStatus: new FormControl(0),
    })

    Swal.fire({
      title: "Cancel Order?",
      text: "Are you sure you want to Cancel Order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {

        const id = this.requestForm.value.washBookingId;
        const values = this.requestForm.value;

        this.requestService.editRequest(id, values).subscribe((resp: any) => {
          this.reload()
          this.alert2();
        })

      }
    });
  }


  reload() {
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['request'])
    })
  }


  alert() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Request Confirmed successfully"
    });
  }

  alert2() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "Request Cancelled successfully"
    });
  }


}
