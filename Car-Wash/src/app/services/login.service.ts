import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginAPI = environment.baseURL + "login-auth/"
  constructor(private http:HttpClient) { }


  getLogin(data:any){
    return this.http.post(this.loginAPI + "login",data);
  }

  registration(data:any){
    return this.http.post(this.loginAPI + "registration",data);
  }

  getAllUsers(){
    return this.http.get(this.loginAPI + "getAllUsers")
  }
}
