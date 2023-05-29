import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginServiceService } from 'src/app/MyServices/login-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private profile: LoginServiceService,
    private route: Router,
    private toast: NgToastService,
    private spinner: NgxSpinnerService
  ) { }
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  formModal: any;
  login!: FormGroup;
  ngOnInit(): void {
    this.login = this.fb.group({
      UserId: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
  hideshowpass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  loginTest() {
    // this.spinner.show();
    sessionStorage.clear();
    if (this.login.valid) {
      this.profile.verifyProfile(this.login.value).subscribe({
        next: (result) => {
          console.log(result.Payload[0].Authorization)
          if (result.Payload[0].Authorization == 'Success') {
            this.profile.storeId(result.id);
            this.login.reset();
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Successfully Logged In',
              duration: 3000,
            });
            this.route.navigate(['Home']);
          } else {
            this.toast.error({
              detail: 'Error',
              summary: 'Invalid Credentials Try Again',
              duration: 2000,
            });
          }

        },
        error: (err) => {
          if (err.error.status == 'Not sync') {
            this.profile.storeId(err.error.id);
            this.route.navigate(['Home']);
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Successfully Logged In',
              duration: 3000,
            });
          } else {
            // this.spinner.hide();
            this.toast.error({
              detail: 'Error',
              summary: err.error.status,
              duration: 2000,
            });
          }
        },
      });
    }
  }
}
