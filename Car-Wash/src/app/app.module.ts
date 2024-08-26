import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLauyoutComponent } from './layouts/main-lauyout/main-lauyout.component';
import { SideBarComponent } from './layouts/side-bar/side-bar.component';
import { NavBarComponent } from './layouts/nav-bar/nav-bar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './layouts/login/login.component';
import { CarWashComponent } from './pages/settings/car-wash/car-wash.component';
import { ServiceAvailableComponent } from './pages/settings/service-available/service-available.component';
import { RoleComponent } from './pages/settings/role/role.component';
import { CardComponent } from './layouts/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleComponent } from './Pages/vehicle/vehicle.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { PackageComponent } from './pages/package/package.component';
import { MatSelectModule } from '@angular/material/select';
import { ReportComponent } from './pages/report/report.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { RequestComponent } from './pages/request/request.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { PiechartComponent } from './pages/dashboard/piechart/piechart.component';
import { CarWashDashboardComponent } from './pages/car-wash-dashboard/car-wash-dashboard.component';
import { CustomerPieChartComponent } from './pages/carWashDashboard/customer-pie-chart/customer-pie-chart.component';
import { CustomerBarChartComponent } from './pages/carWashDashboard/customer-bar-chart/customer-bar-chart.component';
import { ViewEmployeeComponent } from './pages/view-employee/view-employee.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewCustomerComponent } from './pages/view-customer/view-customer.component';
import { CarWashReportComponent } from './pages/car-wash-report/car-wash-report.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';



@NgModule({
  declarations: [
    AppComponent,
    MainLauyoutComponent,
    SideBarComponent,
    NavBarComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    CarWashComponent,
    ServiceAvailableComponent,
    RoleComponent,
    CardComponent,
    VehicleComponent,
    EmployeeComponent,
    PackageComponent,
    ReportComponent,
    CustomerComponent,
    RequestComponent,
    PiechartComponent,
     CarWashDashboardComponent,
     CustomerPieChartComponent,
     CustomerBarChartComponent,
     ViewEmployeeComponent,
     ViewCustomerComponent,
     CarWashReportComponent,
     UserManagementComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxLoadingModule.forRoot({}),
    MatDatepickerModule,
    MatNativeDateModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
