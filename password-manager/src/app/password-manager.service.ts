import { Injectable } from '@angular/core';
import { Firestore,collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

  constructor(private firestore: Firestore, private auth: Auth) { }

  addSite(data: object){
    const dbInstance = collection(this.firestore, 'site')
  addDoc(dbInstance, data)
  }


  loadSite(){
    const dbInstance = collection(this.firestore, 'site')
    return collectionData(dbInstance, {idField:'id'})
    
  }

  updateSite(id: string, data: object){
    const docInstance = doc(this.firestore, 'site', id)
    return updateDoc(docInstance , data)

  }

  deleteSite(id: string){
    const docInstance = doc(this.firestore, 'site', id)
   return  deleteDoc(docInstance)

  }


  addPassword(data: object, siteId: string){
    const dbInstance = collection(this.firestore, `site/${siteId}/passwords`);
    return addDoc(dbInstance, data)
  }


  loadPassword(siteId: string){
    const dbInstance = collection(this.firestore, `site/${siteId}/passwords`);
    return collectionData(dbInstance, {idField:'id'})
  }


  updatePassword(siteId: string, passwordId: string, data: object){
    const dbInstance = doc(this.firestore, `site/${siteId}/passwords`, passwordId)
    return updateDoc(dbInstance, data)
  }

  deletePassword(siteId: string, passwordId: string){
    const dbInstance = doc(this.firestore, `site/${siteId}/passwords`, passwordId)
    return deleteDoc(dbInstance)

  }
//login
login(email: string, password: string){
  return signInWithEmailAndPassword(this.auth, email, password)

}

}
