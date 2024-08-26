import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as ApexCharts from 'apexcharts';

import { CarwashService } from 'src/app/services/carwash.service';
import { ReportService } from 'src/app/services/report.service';



@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit{
  constructor(private router:Router,
    private route:ActivatedRoute,
    private reportService:ReportService
    ) {
  
  }
  ngOnInit(): void {
   this.pieChartReport()
  }


  pieChartReport(){
    this.reportService.getEmployeeReportBasedCarWash().subscribe((resp:any)=>{

      
      let name = [];
      let employee = [];

      for(let total = 0;total< resp.length;total++){
        name.push(resp[total].name);
        employee.push(resp[total].staffs)
      }
      
      let chart_3 = {
        series: employee,
        chart: {
          width: 380,
          type: "pie"
        },
        labels: name,
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

      let chart =new ApexCharts(document.querySelector("#chart4"),chart_3);
      chart.render();
      
    })
  }
}