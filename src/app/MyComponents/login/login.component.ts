import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginServiceService } from 'src/app/MyServices/login-service.service';
import { SyncDataService } from 'src/app/MyServices/sync-data.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private fb:FormBuilder,private profile:LoginServiceService,private route:Router,
    private toast:NgToastService,private syncData :SyncDataService,private spinner: NgxSpinnerService){}
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  formModal: any;
  login!: FormGroup;
  ngOnInit(): void {
    this.login = this.fb.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
  loginTest(){
    sessionStorage.clear()
    if(this.login.valid){
      this.profile.verifyProfile(this.login.value).subscribe({
        next:(result)=>{
        console.log('Status',result.status);
        this.profile.storeId(result.id)
        this.login.reset();
        this.toast.success({detail:'SUCCESS',summary:'Successfully Logged In',duration:3000})        
        this.route.navigate(['sync'])  
      },
      error:(err)=>{
console.log('err',err.error.status)
if(err.error.status == "Not sync"){
  this.profile.storeId(err.error.id)
  this.route.navigate(['Home'])
  this.toast.success({detail:'SUCCESS',summary:'Successfully Logged In',duration:3000})
 // window.location.href = 'https://appcenter.intuit.com/connect/oauth2?client_id=ABYZAh4SKIkzIVe9aLvRngG0qZju1hYD0tXGm44HcY8F6NQWTF&response_type=code&scope=com.intuit.quickbooks.accounting&redirect_uri=https://localhost:7185/api/QBToken&state='+err.error.Id
}
else{
  this.toast.error({detail:'Error',summary:err.error.status,duration:2000})
}
   
      },
    })
  }

  }
  // verify() {
  //   if (this.login.valid) {
  //     this.profile.verifyProfile(this.login.value).subscribe((result) => {
  //       //console.log(result.token);
  //       this.login.reset();
  //       this.profile.storeToken(result.token);
  //       // this.profile.storeRefreshToken(result.refreshToken);
  //       this.toast.success({
  //         detail: 'SUCCESS',
  //         summary: result.message,
  //         duration: 5000,
  //       });
  //       this.route.navigate(['list']);
  //     });
  //   } else {
  //     this.toast.error({ detail: 'Error', summary: 'Invalid', duration: 5000 });

  //     helper.Validatefield(this.login);
  //   }
  // }

  hideshowpass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
}
