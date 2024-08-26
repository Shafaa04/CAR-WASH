import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarwashService } from 'src/app/services/carwash.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-car-wash-dashboard',
  templateUrl: './car-wash-dashboard.component.html',
  styleUrls: ['./car-wash-dashboard.component.css']
})
export class CarWashDashboardComponent implements OnInit{

  check:boolean = false;
  check2:boolean = false;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private carwashService:CarwashService,
    private reportService:ReportService

  ){}
  ngOnInit(): void {
    this.fetchSummaryCarWashReport();
    this.fetchStaffByGender();
    this.fetchStaffByMonthly();
  }

  carWashReport:any;
  requestReport:any;
  fetchSummaryCarWashReport(){
    this.carwashService.getCarWashByUserId(sessionStorage.getItem('user_id')).subscribe((resp:any)=>{
      this.reportService.carWashSummaryReport(resp.carWashId).subscribe((resp2:any)=>{
        this.carWashReport = resp2;
      });
      this.reportService.getAllRequestByCarWash(resp.carWashId).subscribe((resp:any)=>{
        this.requestReport = resp;
      })
    })
  }


  info:any
  fetchStaffByGender(){
    this.carwashService.getCarWashByUserId(sessionStorage.getItem('user_id')).subscribe((resp:any)=>{  
      
      this.reportService.getStaffGenderByCarWash(resp.carWashId).subscribe((resp:any)=>{
        this.info = resp;
        if(this.info.length > 0){
          this.check = true;
        }

      })
      
    })
  }

  names:any;
  fetchStaffByMonthly(){
    this.carwashService.getCarWashByUserId(sessionStorage.getItem('user_id')).subscribe((resp:any)=>{
      
      this.reportService.getMonhlyReport(resp.carWashId).subscribe((resp:any)=>{
        console.log(resp);
        

        this.names = resp;

        if(this.names.length > 0){
          this.check2 = true;
        }
      })
      
    })

}




}
