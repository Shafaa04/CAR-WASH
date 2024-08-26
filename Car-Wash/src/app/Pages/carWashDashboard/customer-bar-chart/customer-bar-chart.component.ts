import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as ApexCharts from 'apexcharts';

import { CarwashService } from 'src/app/services/carwash.service';
import { ReportService } from 'src/app/services/report.service';


@Component({
  selector: 'app-customer-bar-chart',
  templateUrl: './customer-bar-chart.component.html',
  styleUrls: ['./customer-bar-chart.component.css']
})
export class CustomerBarChartComponent implements OnInit{  
  constructor(private router:Router,
    private route:ActivatedRoute,
    private carwashService:CarwashService,
    private reportService:ReportService) { }
  ngOnInit(): void {
   this.fetchStaffByMonthly()
  }


  names:any;
  fetchStaffByMonthly(){
    this.carwashService.getCarWashByUserId(sessionStorage.getItem('user_id')).subscribe((resp:any)=>{
      
      this.names = resp.name;
      this.reportService.getMonhlyReport(resp.carWashId).subscribe((resp:any)=>{
        
        let month = [];
        let booking_count = [];

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for(let total = 0; total < resp.length;total++){
          let monthName = monthNames[resp[total].month - 1];
          month.push(monthName);
          booking_count.push(resp[total].booking_count);
          
        }

        let chart_01 = {
          series: [
            {
              name: "Booking",
              data:booking_count
            }
          ],
          chart: {
            height: 350,
            type: "bar"
          },
          plotOptions: {
            bar: {
              dataLabels: {
                position: "top" 
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function(val:any) {
              return val + "%";
            },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"]
            }
          },
    
          xaxis: {
            categories: month,
            position: "top",
            labels: {
              offsetY: -18
            },
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              fill: {
                type: "gradient",
                gradient: {
                  colorFrom: "#D8E3F0",
                  colorTo: "#BED1E6",
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5
                }
              }
            },
            tooltip: {
              enabled: true,
              offsetY: -35
            }
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "light",
              type: "horizontal",
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [50, 0, 100, 100]
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            labels: {
              show: false,
              formatter: function(val:any) {
                return val + "%";
              }
            }
          },
          title: {
            text: "Monthly booking in" + "  " + this.names + " car wash" + " " + "2024",
            floating: false,
            offsetY: 320,
            align: "center",
            style: {
              color: "#444"
            }
          }
        };
        let chart = new ApexCharts(document.querySelector("#chart"),chart_01);
        chart.render();
      });
      
    })

}

}
