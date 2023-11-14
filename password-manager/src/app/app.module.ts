import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"password-manager-2ac40","appId":"1:763811871926:web:84d561b3cf015c62007a17","storageBucket":"password-manager-2ac40.appspot.com","apiKey":"AIzaSyAagymXc8AVJHXK3Fz-WpGg5iMdLZ_AgEc","authDomain":"password-manager-2ac40.firebaseapp.com","messagingSenderId":"763811871926"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
