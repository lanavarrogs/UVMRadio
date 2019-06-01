import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UserService } from './services/user.service';
import { User } from './interfaces/user';
import { AuthenticationService } from './services/authentication.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  operation: boolean=true;
  pictureid: any ;
  user: User=null;

  public appPages = [
    {
      title: 'Home',
      direccion:'/home',
      icon:'home'
    },

    {
      title: 'VideoPodcast',
      direccion:'/videopoadcast',
      icon:'youtube'
    },

    {
      title: 'Noticias',
      direccion:'/noticias',
      icon:'paper'
      },

      {
        title: 'Programas',
        direccion:'/programas',
        icon:'radio'
      },

        {
          title: 'Galeria',
          direccion:'/galerias',
          icon:'photos'
        },

        {
          title: 'Ambientelince',
          direccion:'/ambientelince',
          icon:'linces'
        },
        
        {
          title: 'Comunicacion',
          direccion:'/comunicacion',
          icon:'people'
        },
        {
          title: 'Cidetec',
          direccion: '/cidetec',
          icon: 'cidetec'
        }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private camera: Camera,
    public userService: UserService,
    public authService: AuthenticationService
  ) {
    this.initializeApp();
      
      this.authService.getStatus().subscribe((data)=>{
          this.userService.getById(data.uid).valueChanges().subscribe((user: any)=>{
            this.user=user;
          },(error)=>{
            console.log(error);
          })
        },(error)=>{
          console.log(error);
        });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  
  async takePicture(){

    try{
      let cameraOptions: CameraOptions ={
        quality: 50,
        targetWidth: 800,
        targetHeight: 800,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        allowEdit: true,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      };

      const result = await this.camera.getPicture(cameraOptions);
      const image = 'data:image/jpeg;base64,'+result;
      this.pictureid = Date.now();

      this.userService.uploadPicture(this.pictureid + '.jpg',image).then((data)=>{
        this.userService.getDownloadUrl(this.pictureid).subscribe((url)=> {
          this.user.avatar = url;
          this.userService.edit(this.user);
        },(error)=>{
          console.log(error);
        })
      }).catch((error) => {
        console.log(error);
      });
    }catch(error){
      console.error(error);
    }
  }

  

}
