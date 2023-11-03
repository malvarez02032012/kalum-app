import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from './modules/dashboard/dashboard.module';
// import { BaseURLInterceptor } from './modules/shared/services/BaseURLInterceptor ';
// import { HttpErrorInterceptorService } from './modules/shared/services/http-error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DashboardModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: BaseURLInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
