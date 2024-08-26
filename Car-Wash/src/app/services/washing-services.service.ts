import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WashingServicesService {

  servicesAPI = environment.baseURL + "services"
  constructor(private http: HttpClient) { }


  getAlServices() {
    return this.http.get(this.servicesAPI)
  }

  addService(body: any) {
    return this.http.post(this.servicesAPI, body)
  }

  editService(id: any, body: any) {
    return this.http.put(this.servicesAPI + "/" + id, body)
  }

  getServiceById(id: any): Observable<any> {
    return this.http.get(this.servicesAPI + "/" + id);
  }
}
