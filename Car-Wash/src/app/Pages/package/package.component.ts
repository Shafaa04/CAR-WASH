import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CarwashService } from 'src/app/services/carwash.service';
import { PackageService } from 'src/app/services/package.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { WashingServicesService } from 'src/app/services/washing-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {

  carType: any[] = [
    { value: 'Small' },
    { value: 'Medium' },
    { value: 'Large' },
    { value: 'Larger' },
  ];
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog2') distributionDialog2!: TemplateRef<any>;
  displayedColumns: string[] = ['id', 'packageName', 'price', 'description', 'serviceName', 'carType','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loading: boolean = true;
  packageForm!: FormGroup;
  packageEditForm!: FormGroup;
  role:any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private packageService: PackageService,
    private dialog: MatDialog,
    private washingServicesService: WashingServicesService,
    private vehicleService: VehicleService,
    private carwashService: CarwashService) { }

  ngOnInit(): void {
    this.fetchAllPackage();
    this.confugureForm();
    this.fetchAllServices();
    this.configureEditForm();
    this.fetchAllVehicle();

    this.role = sessionStorage.getItem('role');    

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

  openDialog2(row: any) {
    this.packageEditForm = new FormGroup({
      packageId:new FormControl(row.packageId),
      packageName:new FormControl(row.packageName),
      price: new FormControl(row.price),
      description:new FormControl(row.description),
      car_id:new FormControl(row.car_id),
      carWashId:new FormControl(row.carWashId),
      services:new FormControl(row.services),
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

  confugureForm() {
    this.packageForm = new FormGroup({
      packageName: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      description: new FormControl(null),
      services: new FormControl(null, Validators.required),
      car_id: new FormControl(null, Validators.required),
      carWashId: new FormControl(null),
    })
  }

  configureEditForm() {
    this.packageEditForm = new FormGroup({
      packageId:new FormControl(null),
      packageName:new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      description:new FormControl(null),
      car_id:new FormControl(null, Validators.required),
      carWashId:new FormControl(null),
      services:new FormControl(null, Validators.required),
    })
  }


  fetchAllPackage() {
    if(sessionStorage.getItem('role')=='ADMINISTRATOR'){
      this.packageService.getAllPackages().subscribe((resp: any) => {        
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
        this.dataSource.sort = this.sort
        this.loading = false;
      })
    }else{
      this.carwashService.getCarWashByUserId(sessionStorage.getItem('user_id')).subscribe((resp:any)=>{
  
        this.packageService.getPackageByCarWash(resp.carWashId).subscribe((resp:any)=>{
          this.dataSource = new MatTableDataSource(resp);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
          this.dataSource.sort = this.sort
          this.loading = false;
          
        })
        
      })
    }
    
  }


  serviceList: any
  fetchAllServices() {
    this.washingServicesService.getAlServices().subscribe((resp: any) => {
      this.serviceList = resp;
    })
  }

  vehicleList: any
  fetchAllVehicle() {
    this.vehicleService.getAllVehicle().subscribe((resp: any) => {
      this.vehicleList = resp;

    })
  }



  onSubmit() {
    this.carwashService.getCarWashByUserId(sessionStorage.getItem('user_id')).subscribe((resp: any) => {
      this.packageForm.patchValue({ carWashId: resp });
      const services_data: any[] = [];
      for (let i = 0; i < this.packageForm.get("services")?.value.length; i++) {
        this.washingServicesService.getServiceById(this.packageForm.get("services")?.value[i]).subscribe((data: any) => {
          services_data.push(data);
        });
      }
      this.packageForm.patchValue({ services: services_data });
      this.vehicleService.getVehicleById(this.packageForm.get("car_id")?.value).subscribe((car_data: any) => {
        this.packageForm.patchValue({ car_id: car_data });
        const package_data = this.packageForm.value;
        this.packageService.addPackage(package_data).subscribe((output: any) => {
          this.reload();
          this.alert()
        
        });
      });
    })
  }

  onEdit(){
    const id = this.packageEditForm.value.packageId;
    const values = this.packageEditForm.value;

    this.packageService.editPackage(id,values).subscribe((resp:any)=>{
      this.reload();
      this.alert2();
    })
  }


  reload() {
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['package'])
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
      title: "Package has been successfully added"
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
      icon: "success",
      title: "Package Edited successfully"
    });
  }


}
