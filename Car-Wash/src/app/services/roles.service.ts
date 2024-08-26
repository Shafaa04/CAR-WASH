import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  roleAPI = environment.baseURL + "roles/"
  constructor(private http:HttpClient) { }

  getAllRoles(){
    return this.http.get(this.roleAPI)
  }

  addRole(body:any){
    return this.http.post(this.roleAPI,body)
  }

  editRole(id:any,body:any){
    return this.http.put(this.roleAPI  + id,body)
  }

  getRoleByRoleName(name:any){
    return this.http.get(this.roleAPI  + "byRoleName" + "/" + name)
  }
}
