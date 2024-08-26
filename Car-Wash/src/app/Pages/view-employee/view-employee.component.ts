import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit{

  constructor(private router:Router,
    private route:ActivatedRoute,
    private employeeService:EmployeeService
  ){}
  ngOnInit(): void {
    const employee = this.route.snapshot.queryParamMap.get('id');
    this.fetchEmployeeByID(employee)
    
  }

  employeeIfo:any;
  fetchEmployeeByID(id:any){
    this.employeeService.getEmployeeByID(id).subscribe((resp:any)=>{
      this.employeeIfo = resp;
      
    })
  }

  onBack(){
    this.router.navigateByUrl('employee')
  }

}
