import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLauyoutComponent } from './layouts/main-lauyout/main-lauyout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './layouts/login/login.component';
import { CarWashComponent } from './pages/settings/car-wash/car-wash.component';
import { ServiceAvailableComponent } from './pages/settings/service-available/service-available.component';
import { RoleComponent } from './pages/settings/role/role.component';
import { VehicleComponent } from './Pages/vehicle/vehicle.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { PackageComponent } from './pages/package/package.component';
import { ReportComponent } from './pages/report/report.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { RequestComponent } from './pages/request/request.component';
import { CarWashDashboardComponent } from './pages/car-wash-dashboard/car-wash-dashboard.component';
import { ViewEmployeeComponent } from './pages/view-employee/view-employee.component';
import { ViewCustomerComponent } from './pages/view-customer/view-customer.component';
import { CarWashReportComponent } from './pages/car-wash-report/car-wash-report.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'',
    component:MainLauyoutComponent,
    children :[
      {
        path:'home',
        component:DashboardComponent
      },
      {
        path:'dashboard',
        component:CarWashDashboardComponent
      },
     
      {
        path:'car-wash',
        component:CarWashComponent
      },
      {
        path:'service-available',
        component:ServiceAvailableComponent
      },
      {
        path:'role',
        component:RoleComponent
      },
      {
        path:'vehicle',
        component:VehicleComponent
      },
      {
        path:'employee',
        component:EmployeeComponent
      },
      {
        path:'package',
        component:PackageComponent
      },
      {
        path:'report',
        component:ReportComponent
      },
      {
        path:'customer',
        component:CustomerComponent
      },
      {
        path:'request',
        component:RequestComponent
      },
      {
        path:'view-employee',
        component:ViewEmployeeComponent
      },
      {
        path:'view-customer',
        component:ViewCustomerComponent
      },
      {
        path:'car-wash-report',
        component:CarWashReportComponent
      },
      {
        path:'user-management',
        component:UserManagementComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
