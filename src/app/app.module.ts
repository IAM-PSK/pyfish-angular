import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RealLoginComponent } from './component/real-login/real-login.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ManageComponent } from './component/manage/manage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DateFnsConfigurationService, DateFnsModule } from 'ngx-date-fns';
import { th } from 'date-fns/locale';
import { registerLocaleData } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask'

export const option: Partial<IConfig> | (() => Partial<IConfig>) = {

};


const frenchConfig = new DateFnsConfigurationService();
frenchConfig.setLocale(th);
@NgModule({
  declarations: [
    AppComponent,
    RealLoginComponent,
    ManageComponent
  ],
  imports: [
    [SweetAlert2Module.forRoot()],
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    [SweetAlert2Module],
    DateFnsModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  providers: [{provide: DateFnsConfigurationService, useValue: frenchConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }
