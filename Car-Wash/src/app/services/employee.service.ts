import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeAPI= environment.baseURL + "employees"
  constructor(private http:HttpClient) { }

  getAllEmployee(){
    return this.http.get(this.employeeAPI)
  }

  addEmployee(body:any){
    return this.http.post(this.employeeAPI,body)
  }

  editEmployee(id:any,body:any){
    return this.http.put(this.employeeAPI  + "/" +id,body)
  }

  getEmployeeByID(id:any){
    return this.http.get(this.employeeAPI + "/" + id)
  }

  getEmployeeByCarWashID(id:any){
    return this.http.get(this.employeeAPI + "/byCarWashId/" + id)
  }

}
