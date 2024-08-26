import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  requestAPI = environment.baseURL + "wash-booking/"
  constructor(private http:HttpClient) { }

  getAllRequest(){
    return this.http.get(this.requestAPI + "allWashBooking")
  }

  editRequest(id:any,body:any){
    return this.http.put(this.requestAPI + "update/" + id,body)
  }

  getRequestByCarWash(id:any){
    return this.http.get(this.requestAPI + "allWashBooking-by-car-wash/" + id)
  }
}
 