import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { FirebaseConfig } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireStorageModule} from 'angularfire2/storage'; 

import { HttpClientModule } from '@angular/common/http';


import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { Camera } from '@ionic-native/camera/ngx';
 


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ScreenOrientation,
    SocialSharing,
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
