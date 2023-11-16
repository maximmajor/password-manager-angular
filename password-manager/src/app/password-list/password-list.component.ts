import { PasswordManagerService } from './../password-manager.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AES, enc } from 'crypto-js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css'],
})
export class PasswordListComponent {
  siteId!: string;
  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;

  passwordList!: Array<any>;

  email!: string;
  username!: string;
  password!: string;
  passwordId!: string;

  formState: string = 'Add New';

  isSuccess: boolean = false;
  successMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private passwordManagerService: PasswordManagerService
  ) {
    this.route.queryParams.subscribe((val: any) => {
      console.log(val);
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteURL = val.siteURL;
      this.siteImgURL = val.siteImgURL;
    });

    this.loadPassword();
  }

  resetForm(){
    this.email = '';
    this.username = '';
    this.password = '';
    this.passwordId = '';
    this.formState = 'Add New';
    this.passwordId = ''
  }

  showAlert(message: string){
    this.isSuccess = true;
    this.successMessage = message;
  }

  onSubmit(values: any) {
    console.log(values)
    const encryptedPassword = this.encryptPassword(values.password)
    values.password = encryptedPassword
    console.log(values)
    if (this.formState === 'Add New') {
      console.log(values);
      try {
        this.passwordManagerService.addPassword(values, this.siteId);
        this.showAlert('Password Save successfully');
      } catch (error) {
        console.log('Error', error);
      }
    } else if (this.formState == 'Edit') {
      try {
        this.passwordManagerService.updatePassword(
          this.siteId,
          this.passwordId,
          values
        );
        this.resetForm()
        this.showAlert('Password edited successfully');
      } catch (error) {
        console.log('Error', error);
      }
    }
  }

  loadPassword() {
    try {
      this.passwordManagerService.loadPassword(this.siteId).subscribe(val =>{
        this.passwordList = val
      })
     
    } catch (error) {
      console.log('Error', error);
    }
  }

  editPassword(
    email: string,
    username: string,
    password: string,
    passwordId: string
  ) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = passwordId;

    this.formState = 'Edit';
  }


  deletePassword(passwordId: string) {
    try{
      this.passwordManagerService.deletePassword(this.siteId, passwordId )
      this.showAlert('password deleted successfully');
    }catch(error){
      console.log(error);

    }


  }


  encryptPassword(password: string){
    const secretKey ='3dV5FA7QiYoa8YJs87mfS2AZh5UR59fT'
    const encryptedPassword = AES.encrypt(password, secretKey).toString()
    return encryptedPassword
  }


  decryptPassword(password: string){
    const secretKey ='3dV5FA7QiYoa8YJs87mfS2AZh5UR59fT'
   const decPassword = AES.decrypt(password, secretKey).toString(enc.Utf8);
  return decPassword
  }


  onDecrypt(password: string, index: number){
    const decPassword = this.decryptPassword(password)
    console.log(decPassword)
    this.passwordList[index].password = decPassword
  }
}
