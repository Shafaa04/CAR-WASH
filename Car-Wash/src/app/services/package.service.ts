import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  packageAPI = environment.baseURL + "packages"
  constructor(private http:HttpClient) { }

  getAllPackages(){
    return this.http.get(this.packageAPI)
  }

  addPackage(body:any){
    return this.http.post(this.packageAPI,body)
  }

  editPackage(id:any,body:any){
    return this.http.put(this.packageAPI + "/"  + id,body)
  }

  getPackageByCarWash(id:any){
    return this.http.get(this.packageAPI + "/by-car-was-id/" + id)
  }

}
