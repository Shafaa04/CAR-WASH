import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit{

  carType:any[] = [
    {value:'Small'},
    {value:'Medium'},
    {value:'Large'},
    {value:'Larger'},
  ];

  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog2') distributionDialog2!: TemplateRef<any>;
  displayedColumns: string[] = ['id','carType','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  loading:boolean =true;
  vehicleForm!:FormGroup;
  vehicleEditForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private vehicleService:VehicleService,
    private dialog:MatDialog){}
  ngOnInit(): void {
    this.configureForm();
   this.fetchSAllVehicle();
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

    openDialog2(row:any) {

      this.vehicleEditForm = new FormGroup({
        carId:new FormControl(row.carId),
        carType:new FormControl(row.carType),
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



  fetchSAllVehicle(){
    this.vehicleService.getAllVehicle().subscribe((resp:any)=>{
      // console.log(resp);
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort 
      this.loading = false;
      
    })
  }

  configureForm(){
    this.vehicleForm = new FormGroup({
      carType:new FormControl(null,Validators.required),
    })
  }

  configureEditForm(){
    this.vehicleEditForm = new FormGroup({
      carId:new FormControl(null),
      carType:new FormControl(null,Validators.required),
    })
  }


  onSubmit(){
    const values = this.vehicleForm.value;
    this.vehicleService.addVehicle(values).subscribe((resp:any)=>{
      this.reload();
      this.alert();
    })
  }

  onEdit(){
    const id = this.vehicleEditForm.value.carId;
    const values = this.vehicleEditForm.value;

    this.vehicleService.editVehicle(id,values).subscribe((resp:any)=>{
      this.reload();
      this.alert2();
    })
  }


  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['vehicle'])
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
      title: "Vehicle added successfully"
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
      title: "Vehicle Edited successfully"
    });
  }




}
