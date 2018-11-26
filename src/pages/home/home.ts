import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { NetworkProvider } from '../../providers/network/network';
import { CommonProvider } from '../../providers/common/common';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  login = { "email": "", "password": "" };
  dataResponse: any;
  token : any;
  email : any;

  constructor(public navCtrl: NavController, public dataService: NetworkProvider,
    public commonProvider: CommonProvider, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public storage : Storage) {


      this.getUserInfo();
    
     
  }


  signin() {
    if (this.login.email == "" && this.login.password == "") {
      this.commonProvider.toastMessage("Please Enter Email and Password");
    }
    else if (this.login.email == "") {
      this.commonProvider.toastMessage("Please Enter Email ");
    }
    else if (this.login.password.length <= 2) {
      this.commonProvider.toastMessage("Please Enter Password ");
    }
    else {

      let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        enableBackdropDismiss: false
      });

      loading.present();

      this.dataService.authenticate(this.login).subscribe(res => {
        loading.dismiss();
        this.dataResponse = res.token;
        this.storage.set('tokenId', this.dataResponse);
        this.storage.set('email',this.login.email);
        let alert = this.alertCtrl.create({
          title: "Token",
          message: this.dataResponse,
          buttons: [
            {
              text: 'Ok',
              role: 'Ok',
              handler: () => {
                this.navCtrl.push('DriversPage');
              }
            },
          ]
        });
        alert.present();
      }), err => {
        console.log(err);
      }
    }
  }


  getUserInfo()
  {
    this.storage.get('tokenId').then((val) => {
          this.token = val;
    }, err =>{
      console.log(err);
    });

    this.storage.get('email').then((val) => {
     this.email  = val;
    }, err =>{
      console.log(err);
    });


    if(this.token != "" )
    {
      this.navCtrl.push('DriversPage');
    }
  }
}
