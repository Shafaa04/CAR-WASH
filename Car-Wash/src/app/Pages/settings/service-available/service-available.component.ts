import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { WashingServicesService } from 'src/app/services/washing-services.service';
import Swal from 'sweetalert2';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}




@Component({
  selector: 'app-service-available',
  templateUrl: './service-available.component.html',
  styleUrls: ['./service-available.component.css']
})
export class ServiceAvailableComponent implements OnInit{
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog2') distributionDialog2!: TemplateRef<any>;
  displayedColumns: string[] = ['id', 'serviceName', 'description','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loading:boolean =true;
  servicesForm!:FormGroup;
  servicesEditForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private washingServicesService:WashingServicesService){}
  ngOnInit(): void {
  this.fetchAllServices();
  this.configureForm();
  this.configureEditForm();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchAllServices(){
    this.washingServicesService.getAlServices().subscribe((resp:any)=>{
      // console.log(resp);
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort= this.sort;
      this.loading = false
      
    })
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


  openDialog2(row:any) {
  this.servicesEditForm = new FormGroup({
    serviceId:new FormControl(row.serviceId),
    serviceName:new FormControl(row.serviceName),
    price:new FormControl(row.price),
    description:new FormControl(row.description)
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

  configureForm(){
    this.servicesForm = new FormGroup({
      serviceName:new FormControl(null,Validators.required),
      price:new FormControl(null,Validators.required),
      description:new FormControl(null),
    })
  }


  configureEditForm(){
    this.servicesEditForm = new FormGroup({
      serviceId:new FormControl(null),
      serviceName:new FormControl(null,Validators.required),
      price:new FormControl(null,Validators.required),
      description:new FormControl(null),
    })
  }


  onSubmit(){
    const values= this.servicesForm.value;
    this.washingServicesService.addService(values).subscribe((resp:any)=>{
      this.reload();
      this.alert()
    })
    
  }

  onEdit(){
    const id= this.servicesEditForm.value.serviceId;
    const values= this.servicesEditForm.value;

    this.washingServicesService.editService(id,values).subscribe((resp:any)=>{
      this.reload();
      this.alert2()
    })

  }


  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['service-available'])
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
      title: "Services added successfully"
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
      title: "Services Edited successfully"
    });
  }




}


