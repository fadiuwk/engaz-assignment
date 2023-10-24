import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeadsComponent } from './ui/components/leads/leads.component';
import { HandleErrorInterceptor } from './core/interceptors/handle-error.interceptor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    LeadsComponent,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
