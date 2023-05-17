import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { LoginServiceService } from 'src/app/MyServices/login-service.service';
import { SyncDataService } from 'src/app/MyServices/sync-data.service';

@Component({
  selector: 'app-sync-page',
  templateUrl: './sync-page.component.html',
  styleUrls: ['./sync-page.component.css']
})
export class SyncPageComponent {
assignData:any;

  id:any;
  data:any;
syncDatas :any;
onChangeInput($event:any){
  const id = $event.target.id;
  const isChecked = $event.target.checked;
  const value = $event.target.value;
this.syncDatas =  this.syncDatas.map((d:any)=>{
  if(d.id == id && value == 1 ){
d.optionValue1 = isChecked;
if(d.optionValue1 == false || d.optionValue2 == false){
  d.optionValue3 = false
  return d
}
if(d.optionValue1 == true && d.optionValue2 == true){
  d.optionValue3 = true
  return d
}
return d
  }
  if(d.id == id && value == 2 ){
    d.optionValue2 = isChecked;
    if(d.optionValue1 == false || d.optionValue2 == false){
      d.optionValue3 = false
      return d
    }
    if(d.optionValue1 == true && d.optionValue2 == true){
      d.optionValue3 = true
      return d
    }
    return d
      }
      if(d.id == id && value == 3 ){
        d.optionValue1 = isChecked;
        d.optionValue2 = isChecked;
        d.optionValue3 = isChecked;
        return d
          }          
  return d
})
  console.log(this.syncDatas)
}
parentselector:boolean = false;
  constructor(private syncData:SyncDataService,private login:LoginServiceService,private toast:NgToastService){
this.id = this.login.getId();

    this.syncData.getSyncData(this.id).subscribe({
      next:(res)=>{      
        console.log('res',res.package) 
        console.log('save',this.parentselector)  
this.syncDatas = res.package.modulePkg;
this.assignData = res.package.assignModules;
this.parentselector = res.package.isFirstLoad;
if(this.parentselector === true){
  this.savebtn ='';
  this.updatebtn = 'none';
}else{
  this.savebtn ='none';
  this.updatebtn = '';
}
console.log('save',this.parentselector) 
      }
    });
    }
  UserId:any;
  Sync(){

this.syncData.saveSyncStatus(this.syncDatas,this.syncDatas[0].userId).subscribe({
  next:(res)=>{
    this.toast.success({detail:'Success',summary:'Configuration Updated Successfully',duration:3000})
    console.log('Result',res)
  },
  error:(err)=>{
    this.toast.error({detail:'Error',summary:'Some error Occurred',duration:3000})
    console.log('Error',err)
  }
})
    //window.location.href ='https://appcenter.intuit.com/connect/oauth2?client_id=ABYZAh4SKIkzIVe9aLvRngG0qZju1hYD0tXGm44HcY8F6NQWTF&response_type=code&scope=com.intuit.quickbooks.accounting&redirect_uri=https://localhost:7185/api/QBToken&state=256'
     
  }
  Sync1(){

    this.syncData.saveSyncStatus(this.syncDatas,this.syncDatas[0].userId).subscribe({
      next:(res)=>{
        this.toast.success({detail:'Success',summary:'Configuration Saved Successfully',duration:3000})
        console.log('Result',res)
      },
      error:(err)=>{
        this.toast.error({detail:'Error',summary:'Some error Occurred',duration:3000})
        console.log('Error',err)
      }
    })
        //window.location.href ='https://appcenter.intuit.com/connect/oauth2?client_id=ABYZAh4SKIkzIVe9aLvRngG0qZju1hYD0tXGm44HcY8F6NQWTF&response_type=code&scope=com.intuit.quickbooks.accounting&redirect_uri=https://localhost:7185/api/QBToken&state=256'
         
      }
  updatebtn='none';
  savebtn=''
}
