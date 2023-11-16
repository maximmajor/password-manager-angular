import { Component, OnInit } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent  {

  allSites!: Observable<Array<any>>;
  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;
  siteId!: string;
  formState: string = "Add New"
  isSuccess: boolean = false;
  successMessage!: string;

  constructor(private passwordManagerService: PasswordManagerService){
    this.loadSite()
  }
  
  showAlert(message: string){
    this.isSuccess = true;
    this.successMessage = message;
  }

  onSubmit(values: object){
    if(this.formState == "Add New"){
      try {
        this.passwordManagerService.addSite(values);
        this.showAlert('Data saved successfully')
      } catch (error) {
        console.error('Error:', error);
      }
    }else if(this.formState == "Edit"){
      try {
        
      this.passwordManagerService.updateSite(this.siteId, values)
      this.showAlert('Data Edited successfully')
      } catch (error) {
        console.error('Error:', error);
      }
    }
   
  }


  loadSite(){
    this.allSites = this.passwordManagerService.loadSite()
  }


  editSite(siteName: string, siteURL: string, siteImgURL: string, id: string){
    console.log('Edit Site', siteName, siteURL, siteImgURL)
    this.siteName = siteName
    this.siteURL = siteURL
    this.siteImgURL = siteImgURL
    this.siteId = id
    this.formState = 'Edit'


  }


  deleteSite(id: string){
    
    try {
      this.passwordManagerService.deleteSite(id)
      this.showAlert('Data Deleted successfully')
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
