import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarwashService } from 'src/app/services/carwash.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  role: any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private carwashService: CarwashService) { }
  ngOnInit(): void {
    this.fetchCarWashByUserId();
    this.changeLog();
    this.role = sessionStorage.getItem('role');
  }

  carWashName: any;
  fetchCarWashByUserId() {
    this.carwashService.getCarWashByUserId(sessionStorage.getItem('user_id')).subscribe((resp: any) => {
      this.carWashName = resp.name;
    })
  }

  logOut() {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        this.router.navigate(["/"]);
      }
    });

  }


  changeLog() {
    let localData = sessionStorage.getItem("role");
    if (localData == null) {
      this.router.navigateByUrl("/")
    }
  }

}
