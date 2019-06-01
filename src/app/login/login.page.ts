import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ToastController, MenuController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import {User} from '../interfaces/user'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nombre: string;
  email: string;
  apellidos: string;
  password1: string;
  password2: string;
  operation: string = "login";


  constructor(private auth: AuthenticationService, 
    public router: Router,
    private screenOrientation: ScreenOrientation,
    public toastController: ToastController,
    public userAuthService: UserService,
    public menuCtrl: MenuController ) {

    this.screenOrientation.lock('portrait');
    this.menuCtrl.enable(false);
   }

  ngOnInit() {
  }

 
  

  onSubmit(){
    this.auth.loginWithEmail(this.email,this.password1).then((data)=>{
      console.log(data);
      this.router.navigate(['/home']);
    }).catch((error)=> {
      console.log(error);
    });
  }


  loginWithFacebook(){
        this.auth.facebookLogin().then((data)=> {
          console.log(data);
          this.router.navigate(['/home']);
        } ).catch((error)=>{
          console.log(error);
        });
    }




    registerWithEmailAndPassword(){
        if(this.password1.length<6){
          this.toastMessage("La contraseña debe tener al menos 6 caracteres");
        }else{
          
          if(this.password1 === this.password2 ){
            const user: User = {
              name: this.nombre,
              lastname: this.apellidos,
              uid: Date.now(),
              email: this.email
            };

            this.auth.registerWithEmail(this.email,this.password1).then((data)=>{
              
              console.log(data);
                this.userAuthService.createNewUser(user).then((data)=>{
                  this.toastMessage("Usuario Registrado con exito");
                  console.log(data);
                  this.operation = "login";
                }).catch((error)=>{
                  console.log(error);
                });
            }).catch((error)=>{
              console.log(error);
            })


          }else{
            this.toastMessage("Las contraseñas no coinciden");
          }
        }

    }


  async toastMessage(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
