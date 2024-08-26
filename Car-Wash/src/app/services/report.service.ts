import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  reportAPI = environment.baseURL + "report/"
  constructor(private http:HttpClient) { }

  adminSummaryReport(){
    return this.http.get(this.reportAPI + "summary")
  }

  carWashSummaryReport(id:any){
    return this.http.get(this.reportAPI + "summary-by-car-wash" + "/" + id)
  }

  getAllRequestByCarWash(id:any){
    return this.http.get(this.reportAPI  + "request-report-by-car-wash" + "/" + id)
  }

  getReportByDate(body:any){
    return this.http.post(this.reportAPI + "by-start-date-to-end-date",body)
  }


  getReportByDateByCarWash(id:any,body:any){
    return this.http.post(this.reportAPI + "by-start-date-to-end-date-car-wash/" + id,body)
  }

  getEmployeeReportBasedCarWash(){
    return this.http.get(this.reportAPI + "employee-based-on-car-wash")
  }

  getStaffGenderByCarWash(id:any){
    return this.http.get(this.reportAPI + "staff-by-gender-car-wash/" + id)
  }

  getMonhlyReport(id:any){
    return this.http.get(this.reportAPI + "monthlyWashBookingReport/" + id)
  }

}
