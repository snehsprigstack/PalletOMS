import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginServiceService } from 'src/app/MyServices/login-service.service';
import { SyncDataService } from 'src/app/MyServices/sync-data.service';

@Component({
  selector: 'app-sync-page',
  templateUrl: './sync-page.component.html',
  styleUrls: ['./sync-page.component.css'],
})
export class SyncPageComponent implements OnInit {
  assignData: any;
  id: any;
  data: any;
  syncDatas: any;
  onChangeInput($event: any) {
    const id = $event.target.id;
    const isChecked = $event.target.checked;
    const value = $event.target.value;
    this.syncDatas = this.syncDatas.map((d: any) => {
      if (d.id == id && value == 1) {
        d.optionValue1 = isChecked;
        if (d.optionValue1 == false || d.optionValue2 == false) {
          d.optionValue3 = false;
          return d;
        }
        if (d.optionValue1 == true && d.optionValue2 == true) {
          d.optionValue3 = true;
          return d;
        }
        return d;
      }
      if (d.id == id && value == 2) {
        d.optionValue2 = isChecked;
        if (d.optionValue1 == false || d.optionValue2 == false) {
          d.optionValue3 = false;
          return d;
        }
        if (d.optionValue1 == true && d.optionValue2 == true) {
          d.optionValue3 = true;
          return d;
        }
        return d;
      }
      if (d.id == id && value == 3) {
        d.optionValue1 = isChecked;
        d.optionValue2 = isChecked;
        d.optionValue3 = isChecked;
        return d;
      }
      return d;
    });
  }
  parentselector: boolean = false;
  constructor(
    private syncData: SyncDataService,
    private login: LoginServiceService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService
  ) {
    this.id = this.login.getId();

    this.syncData.getSyncData(this.id).subscribe({
      next: (res) => {
        this.syncDatas = res.package.modulePkg;
        this.assignData = res.package.assignModules;
        this.parentselector = res.package.isFirstLoad;
        if (this.parentselector === true) {
          this.savebtn = '';
          this.updatebtn = 'none';
        } else {
          this.savebtn = 'none';
          this.updatebtn = '';
        }
      },
    });
  }
  ngOnInit(): void {
    this.spinner.hide();
  }
  UserId: any;
  Sync() {
    this.syncData
      .saveSyncStatus(this.syncDatas, this.syncDatas[0].userId)
      .subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'Success',
            summary: 'Configuration Updated Successfully',
            duration: 3000,
          });
          setTimeout(() => {
            location.reload();
          }, 3000);
        },
        error: (err) => {
          this.toast.error({
            detail: 'Error',
            summary: 'Some error Occurred',
            duration: 3000,
          });
        },
      });
  }
  Sync1() {
    this.syncData
      .saveSyncStatus(this.syncDatas, this.syncDatas[0].userId)
      .subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'Success',
            summary: 'Configuration Saved Successfully',
            duration: 3000,
          });
          setTimeout(() => {
            location.reload();
          }, 3000);
        },
        error: (err) => {
          this.toast.error({
            detail: 'Error',
            summary: 'Some error Occurred',
            duration: 3000,
          });
        },
      });
  }
  updatebtn = 'none';
  savebtn = '';
}
