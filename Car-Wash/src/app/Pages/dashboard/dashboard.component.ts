import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { marker } from 'leaflet';
import { CarwashService } from 'src/app/services/carwash.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PackageService } from 'src/app/services/package.service';
import { ReportService } from 'src/app/services/report.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { WashingServicesService } from 'src/app/services/washing-services.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private map: any;

  // private initMap(): void {
  //   this.map = L.map('map', {
  //     center: [39.8282, -98.5795],
  //     zoom: 3
  //   });

  //   const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 18,
  //     minZoom: 3,
  //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   });

  //   tiles.addTo(this.map);
  // }

  role: any;
  username: any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private washingServicesService: WashingServicesService,
    private vehicleService: VehicleService,
    private employeeService: EmployeeService,
    private packageService: PackageService,
    private reportService: ReportService,
    private carwashService:CarwashService) { }

  ngAfterViewInit(): void {
    // this.initMap();
  }


  ngOnInit(): void {
    this.fetchSummaryReport();
    this.role = sessionStorage.getItem('role');
    this.location();
  }

  location() {
    const map = L.map('map').setView([-6.1659, 39.2026], 9);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([-6.1659, 39.2026]).addTo(map)
      .bindPopup('Zanzibar')
      .openPopup();


      this.carwashService.getAllCarWash().subscribe((resp: any) => {                
        if (resp.length > 0) {
          for(let z = 0; z < resp.length; z++){
            const unguja = marker([resp[z].latitude, resp[z].longitude]).addTo(map).
            bindPopup("<h5><b style='color:green;'> Car Wash Name:" + resp[z].name + 
            " <br> Contacts : " + resp[z].contactNumber + "<h5><b>");
          }
        }
      });
  }


  adminReport: any
  fetchSummaryReport() {
    this.reportService.adminSummaryReport().subscribe((resp: any) => {
      this.adminReport = resp;
    })
  }

}



