import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() => initializeApp({"projectId":"mis-notas-bb287","appId":"1:460892280018:web:ddba7ed1e6b414fc58890b","storageBucket":"mis-notas-bb287.appspot.com","apiKey":"AIzaSyAq0x1mlgx3hYQsCR0s19hq57g81SAQyM4","authDomain":"mis-notas-bb287.firebaseapp.com","messagingSenderId":"460892280018","measurementId":"G-ZKXKE4DL2K"})), provideFirestore(() => getFirestore())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
