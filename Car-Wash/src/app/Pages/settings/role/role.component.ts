import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from 'src/app/layouts/login/login.component';
import { RolesService } from 'src/app/services/roles.service';
import Swal from 'sweetalert2';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit{
  @ViewChild('distributionDialog') distributionDialog!: TemplateRef<any>;
  @ViewChild('distributionDialog2') distributionDialog2!: TemplateRef<any>;
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loading:boolean =true;
  roleForm!:FormGroup;
  roleEditForm!:FormGroup;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private rolesService:RolesService){ }
  ngOnInit(): void {
  this.fetchAllRole();
  this.configureForm();
  this.configureEditForm();
  }

  fetchAllRole(){
    this.rolesService.getAllRoles().subscribe((resp:any)=>{
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


  openDialog2(row:any) {
    this.roleEditForm = new FormGroup({
      roleId:new FormControl(row.roleId),
      roleName:new FormControl(row.roleName)
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
    this.roleForm = new FormGroup({
      roleName:new FormControl(null,Validators.required)
    })
  }

  configureEditForm(){
    this.roleEditForm = new FormGroup({
      roleId:new FormControl(null),
      roleName:new FormControl(null,Validators.required)
    })
  }

  onSubmit(){
    const values = this.roleForm.value;
    this.rolesService.addRole(values).subscribe((resp:any)=>{
      this.reload()
      this.alert();
     
    })
  }

  onEdit(){
    const id = this.roleEditForm.value.roleId;
    const values = this.roleEditForm.value;
    this.rolesService.editRole(id,values).subscribe((resp:any)=>{
      this.reload();
      this.alert2()
    })

  }

  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate(['role'])
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
      title: "Role added successfully"
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
      title: "Role Edited successfully"
    });
  }




}

