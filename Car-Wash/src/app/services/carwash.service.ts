import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CarwashService {

  carWashAPI = environment.baseURL + "carwashes"  
  constructor(private http:HttpClient) { }

  getAllCarWash(){
    return this.http.get(this.carWashAPI)
  }

  addCarWash(body:any){
    return this.http.post(this.carWashAPI,body)
  }

  editCarWash(id:any,body:any){
    return this.http.put(this.carWashAPI  + "/" +id,body)
  }

  getCarWashByUserId(id:any){
    return this.http.get(this.carWashAPI + "/" + "get-by-user_id" + "/" +id)
  }

}
