import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CarwashService } from 'src/app/services/carwash.service';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog2') distributionDialog2!: TemplateRef<any>;
  displayedColumns: string[] = ['id','firstName','lastName','gender','email','phone','address','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  

  loading:boolean =true;
  employeeForm!:FormGroup;
  employeeEditForm!:FormGroup;
  role:any;
  userId:any;

  gender:any[] = [
    {value:'M',viewValue:'Male'},
    {value:'F',viewValue:'Female'}
  ];

  constructor(private router:Router,
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private employeeService:EmployeeService,
  private carwashService:CarwashService){}
  ngOnInit(): void {
    this.configureForm();
    this.fetchAllEmployee();
    this.configureEditForm();
    this.fetchCarWashByUserId();
    this.role = sessionStorage.getItem('role');
    this.userId = sessionStorage.getItem('user_id')
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

    openDialog() {
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

  fetchAllEmployee(){
    if(sessionStorage.getItem('role') == 'ADMINISTRATOR'){
      this.employeeService.getAllEmployee().subscribe((resp:any)=>{
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort 
        this.loading = false;
        
      })
    }else{
      this.carwashService.getCarWashByUserId(sessionStorage.getItem('user_id')).subscribe((resp: any) => {
        this.employeeService.getEmployeeByCarWashID(resp.carWashId).subscribe((resp:any)=>{
          // console.log(resp);
          this.dataSource = new MatTableDataSource(resp);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort 
          this.loading = false;
          
        })
      })
    
    }
  
  }

    configureForm(){
      this.employeeForm = new FormGroup({
        firstName: new FormControl(null,Validators.required),
        lastName: new FormControl(null,Validators.required),
        gender: new FormControl(null,Validators.required),
        email: new FormControl(null),
        phone: new FormControl(null,Validators.required),
        address: new FormControl(null),
        carWashId:new FormControl(null)
      })
    }

    configureEditForm(){
      this.employeeEditForm = new FormGroup({
        employeeID:new FormControl(null),
        firstName: new FormControl(null,Validators.required),
        lastName: new FormControl(null,Validators.required),
        email: new FormControl(null),
        phone: new FormControl(null,Validators.required),
        address: new FormControl(null),
        carWashId:new FormControl(null),
        gender: new FormControl(null,Validators.required),
      })
    }

    fetchCarWashByUserId() {
      this.carwashService.getCarWashByUserId(sessionStorage.getItem('user_id')).subscribe((resp: any) => {
        // console.log(resp);
      })
    }
  


    onSubmit(){
      this.carwashService.getCarWashByUserId(sessionStorage.getItem('user_id')).subscribe((resp: any) => {
        this.employeeForm.patchValue({carWashId:resp})
        const values = this.employeeForm.value;
           this.employeeService.addEmployee(values).subscribe((resp:any)=>{
        this.reload();
        this.alert()
      })
      
      })
     
    }

    onEdit(){
      const id = this.employeeEditForm.value.employeeID;
      const values = this.employeeEditForm.value;
      // console.log(values);
      this.employeeService.editEmployee(id,values).subscribe((resp:any)=>{
        this.reload();
        this.alert2();
      })
    }

    openDialog2(row:any) {
      this.employeeEditForm = new FormGroup({
        employeeID:new FormControl(row.employeeID),
        firstName: new FormControl(row.firstName),
        lastName: new FormControl(row.lastName),
        email: new FormControl(row.email),
        phone: new FormControl(row.phone),
        address: new FormControl(row.address),
        carWashId:new FormControl(row.carWashId),
        gender: new FormControl(row.gender),
      })
      let dialogRef = this.dialog.open(this.distributionDialog2, {
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

    onView(data:any){

      this.router.navigate(['view-employee'],{queryParams:{id:data.employeeID}});
    }

    reload(){
      this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
        this.router.navigate(['employee'])
      })
    }
  
  
    alert(){
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
        title: "Employee added successfully"
      });
    }
  
    alert2(){
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
        title: "Employee Edited successfully"
      });
    }
  


}
