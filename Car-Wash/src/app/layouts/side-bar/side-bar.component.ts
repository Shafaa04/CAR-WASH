import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{

  role:any;
  constructor(private router:Router,
    private route:ActivatedRoute){}
  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
    // console.log(this.role);
    
  }

  Home(){
    this.router.navigate(['home']).then(()=>{
      location.reload()
    })
  }

  Dashboard(){
    this.router.navigate(['dashboard']).then(()=>{
      location.reload()
    })
  }

}
