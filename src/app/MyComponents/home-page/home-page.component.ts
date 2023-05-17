import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginServiceService } from 'src/app/MyServices/login-service.service';
import { SyncDataService } from 'src/app/MyServices/sync-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  login!: FormGroup;
  Uid:any;
  constructor(private profile:LoginServiceService,private toast:NgToastService,private route:Router,private syncService:SyncDataService,
    private spinner:NgxSpinnerService){}
  loginTest(){
    this.spinner.show();
    this.Uid = this.profile.getId();
    console.log('Uid',this.Uid);
    window.location.href = 'https://appcenter.intuit.com/connect/oauth2?client_id=ABYZAh4SKIkzIVe9aLvRngG0qZju1hYD0tXGm44HcY8F6NQWTF&response_type=code&scope=com.intuit.quickbooks.accounting&redirect_uri=https://localhost:7185/api/QBToken&state=' +this.Uid
  }
}
