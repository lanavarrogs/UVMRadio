import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {User} from '../interfaces/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    user: User;
    message:string = "#UVMRadio Prueba";
    file: string = null;
    link: string = "http://www.uvmradio.mx/";
    subject:string = "Pruebas";

  constructor(private socialSharing: SocialSharing,private authService: AuthenticationService,private userService: UserService,public menuCtrl: MenuController) { 
    this.menuCtrl.enable(true);
    this.authService.getStatus().subscribe((data)=>{
      this.userService.getById(data.uid).valueChanges().subscribe((user: any)=>{
        this.user=user;
      },(error)=>{
        console.log(error);
      })
    },(error)=>{
      console.log(error);
    })

  }


  btnShare(){
    this.socialSharing.share(this.message,this.subject,this.file,this.link)
      .then(()=>{
        console.log("Se ha compartido correctamente");
      }).catch(()=>{
        console.log("Error");
      });
    }
}
