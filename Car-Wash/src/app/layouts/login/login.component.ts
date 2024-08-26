import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;


  public loading = false;
  loginForm!: FormGroup

  constructor(private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService) { }
  ngOnInit(): void {
    this.configureLoginForm();
  }


  configureLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }


  onLogin() {
    this.loading = true;
    setTimeout(() => {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      const shafaa = {
        "username": username,
        "password": password
      }
      this.loginService.getLogin(shafaa).subscribe((resp: any) => {
        if (resp.length > 0) {
          this.loading = false;


          if (resp[0].user_status == '1') {
            sessionStorage.setItem("user_id", resp[0].user_id);
            sessionStorage.setItem("username", resp[0].username);
            sessionStorage.setItem("role", resp[0].role_name);

            switch (resp[0].role_name) {
              case 'ADMINISTRATOR':
                this.router.navigateByUrl("/home").then(() => {
                  location.reload();
                })
             

                break;
              case 'CAR WASH':
                this.router.navigateByUrl("/dashboard").then(() => {
                  location.reload();
                })
                break;
              default:
                this.router.navigateByUrl("")
            }
          } else {
            this.loading = false;
            // console.log('status ni 0 kawa blocked');
          }
        } else {
          this.loading = false;
          Swal.fire({
            title: "Error!",
            text: "Incorrect username or password.",
            icon: "error"
          });
        }
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          Swal.fire({
            title: "Error!",
            text: "Incorrect username or password .",
            icon: "error"
          });
        }
      );
    }, 3000);
  }
}
