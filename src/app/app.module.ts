import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CcNotificationComponent } from './cc-notification/cc-notification.component';
import { NotificationService } from './cc-notification/notification.service';

@NgModule({
  declarations: [	
    AppComponent,
      CcNotificationComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
