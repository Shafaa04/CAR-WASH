import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit{

  constructor(private router:Router,
    private route:ActivatedRoute,
    private customerService:CustomerService){}
  ngOnInit(): void {
  const customer = this.route.snapshot.queryParamMap.get('id');
 this.fetchCustomerByID(customer)
  
  }

  customerInfo:any;
  fetchCustomerByID(id:any){
    this.customerService.getCustomerByID(id).subscribe((resp:any)=>{
      this.customerInfo = resp;
      
    })
  }

  onBack(){
    this.router.navigateByUrl('customer')
  }

}
