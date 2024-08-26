import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicleAPI =environment.baseURL + "vehicles"
  constructor(private http:HttpClient) { }

  getAllVehicle(){
    return this.http.get(this.vehicleAPI)
  }

  addVehicle(body:any){
    return this.http.post(this.vehicleAPI,body)
  }

  editVehicle(id:any,body:any){
    return this.http.put(this.vehicleAPI + "/" + id,body)
  }

  getVehicleById(id: any): Observable<any>{
    return this.http.get(this.vehicleAPI + "/" + id);
  }
}
