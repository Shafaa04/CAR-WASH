import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as ApexCharts from 'apexcharts';

import { CarwashService } from 'src/app/services/carwash.service';
import { ReportService } from 'src/app/services/report.service';



@Component({
  selector: 'app-customer-pie-chart',
  templateUrl: './customer-pie-chart.component.html',
  styleUrls: ['./customer-pie-chart.component.css']
})
export class CustomerPieChartComponent implements OnInit{
  constructor(private router:Router,
    private route:ActivatedRoute,
    private reportService:ReportService,
    private carwashService:CarwashService) { }
  ngOnInit(): void {
  this.fetchStaffByGender()
  }

  fetchStaffByGender(){
    this.carwashService.getCarWashByUserId(sessionStorage.getItem('user_id')).subscribe((resp:any)=>{  
      
      this.reportService.getStaffGenderByCarWash(resp.carWashId).subscribe((resp:any)=>{

        let gender = [];
        let staffs = [];

        for(let total = 0;total < resp.length;total++){

          let mappedGender = resp[total].gender === 'M'  ? 'Male' : (resp[total].gender === 'F' ? 'Female' : '')
          gender.push(mappedGender);
          staffs.push(resp[total].staffs);
          
        }

        let chart_02 = {
          series: staffs,
          chart: {
            width: 380,
            type: "pie"
          },
          labels: gender,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        };

        let chart = new ApexCharts(document.querySelector("#chart2"),chart_02);
        chart.render();
        
      })
      
    });
  }

}
