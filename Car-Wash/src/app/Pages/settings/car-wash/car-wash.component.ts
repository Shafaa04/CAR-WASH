import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CarwashService } from 'src/app/services/carwash.service';
import { LoginService } from 'src/app/services/login.service';
import { RolesService } from 'src/app/services/roles.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-car-wash',
  templateUrl: './car-wash.component.html',
  styleUrls: ['./car-wash.component.css']
})
export class CarWashComponent implements OnInit {
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog2') distributionDialog2!: TemplateRef<any>;
  displayedColumns: string[] = ['id', 'name', 'location', 'number', 'email', 'website', 'workingHours', 'latitude', 'longitude', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  carWashForm!: FormGroup;
  carWashEditForm!: FormGroup;
  loading: boolean = true;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private carwashService: CarwashService,
    private rolesService: RolesService,
    private loginService: LoginService) { }
  ngOnInit(): void {
    this.fetchAllCarWash();
    this.configureForm();
    this.configureEditForm();
  }

  fetchAllCarWash() {
    this.carwashService.getAllCarWash().subscribe((resp: any) => {
      // console.log(resp);
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort
      this.loading = false;

    })
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

  configureForm() {
    this.carWashForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      contactNumber: new FormControl(null, Validators.required),
      email: new FormControl(null,[Validators.required,Validators.email]),
      website: new FormControl(null),
      user_data: new FormControl(null),
      workingHours: new FormControl(null, Validators.required),
      latitude: new FormControl(null, Validators.required),
      longitude: new FormControl(null, Validators.required),
    })
  }


  configureEditForm() {
    this.carWashEditForm = new FormGroup({
      carWashId: new FormControl(null),
      name: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      contactNumber: new FormControl(null, Validators.required),
      email: new FormControl(null,),
      website: new FormControl(null),
      user_data: new FormControl(null),
      workingHours: new FormControl(null, Validators.required),
      latitude: new FormControl(null, Validators.required),
      longitude: new FormControl(null, Validators.required),
    })
  }

  onSubmit() {

    this.rolesService.getRoleByRoleName("CAR WASH").subscribe((resp: any) => {
     
      const login = {
        username: this.carWashForm.value.email,
        password: this.carWashForm.value.email,
        role_id: resp,
        user_status: '1'
      }
   
      this.loginService.registration(login).subscribe((resp: any) => {
        this.carWashForm.patchValue({ user_data: resp});
        const values = this.carWashForm.value;
        this.carwashService.addCarWash(values).subscribe((resp: any) => {
          this.reload();
          this.alert();
        })
      });
    });
  }

  
  onEdit() {
    const id = this.carWashEditForm.value.carWashId;
    const values = this.carWashEditForm.value;
    this.carwashService.editCarWash(id, values).subscribe((resp: any) => {
      this.reload();
      this.alert2();
    })
  }

  openDialog2(row: any) {
    this.carWashEditForm = new FormGroup({
      carWashId: new FormControl(row.carWashId),
      name: new FormControl(row.name),
      location: new FormControl(row.location),
      contactNumber: new FormControl(row.contactNumber),
      email: new FormControl(row.email),
      website: new FormControl(row.website),
      workingHours: new FormControl(row.workingHours),
      latitude: new FormControl(row.latitude),
      longitude: new FormControl(row.longitude),
    });
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



  reload() {
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['car-wash'])
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
      title: "Car Wash added successfully"
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
      title: "Car Wash Edited successfully"
    });
  }




}

