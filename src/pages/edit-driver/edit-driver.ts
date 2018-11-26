import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common/common';
import { NetworkProvider } from '../../providers/network/network';

/**
 * Generated class for the EditDriverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-driver',
  templateUrl: 'edit-driver.html',
})
export class EditDriverPage {

  data = { "id" : "", "fname": "","lname":"" ,"dob" : "",  "lno": "" ,"email" :"","phone" : "" ,"expdate" :""};

  

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public commonProvider:CommonProvider,
    public dataProvider : NetworkProvider , public loadingCtrl: LoadingController,
    public alertCtrl : AlertController) {

     this.data.id =  this.navParams.get('id');
   
     this.data.fname =  this.navParams.get('fname');
     this.data.lname =  this.navParams.get('lname');
     this.data.dob =  this.navParams.get('dob');
     this.data.lno =  this.navParams.get('lno');
     this.data.email =  this.navParams.get('email');
     this.data.phone =  this.navParams.get('phone');
     this.data.expdate =  this.navParams.get('expdate');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDriverPage');

    console.log(this.data.id);
  }


  saveDriver()
  {
    if(this.data.fname =="" && this.data.lname == "" && this.data.dob =="" 
    && this.data.lno == "" && this.data.email =="" && this.data.phone =="" && this.data.expdate =="" )
    {
      this.commonProvider.toastMessage("Please Enter All Values");
    }
    else if(this.data.fname.length <=3)
    {
      this.commonProvider.toastMessage("Please Enter First Name");
    }
    else if(this.data.lname.length <=3)
    {
      this.commonProvider.toastMessage("Please Enter Last Name");
    }
    else if(this.data.dob =="")
    {
      this.commonProvider.toastMessage("Please Enter Date of Birth");
    }
    else if(this.data.lno.length !=10)
    {
      this.commonProvider.toastMessage("Please Enter 10 digit Lisence No.");
    }
    else if(this.data.email.length <=10)
    {
      this.commonProvider.toastMessage("Please Enter Email.");
    }
    else if(this.data.phone.length !=10)
    {
      this.commonProvider.toastMessage("Please Enter 10 digit Mobile No.");
    }
    else if(this.data.expdate =="")
    {
      this.commonProvider.toastMessage("Please Enter Lisence Expiry date");
    }
    else{

      let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        enableBackdropDismiss: false
      });

      loading.present();
      
      this.dataProvider.editDriver(this.data).subscribe(res  => {
        loading.dismiss();

        console.log(res);
        var dataResponsemsg = res;
    
        let alert = this.alertCtrl.create({
          title: "Message",
          message: dataResponsemsg,
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


}
