import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import { User } from '../interfaces/user';
import {AngularFireStorage} from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFireDatabase: AngularFireDatabase,private angularStorageDatabase: AngularFireStorage) { }


  createNewUser(user: User){
    return this.angularFireDatabase.object('/user' + user.uid).set(user);
  }

  getById(uid){
    return this.angularFireDatabase.object('/user'+uid);
  }

  uploadPicture(picture_name,image){
    return this.angularStorageDatabase.ref('pictures/'+picture_name).putString(image,'data_url');
  }

  getDownloadUrl(picture_name){
    return this.angularStorageDatabase.ref('pictures/'+picture_name).getDownloadURL();
  }


  edit(user: User) {
    return this.angularFireDatabase.object('/user' + user.uid).set(user);
  }

}
