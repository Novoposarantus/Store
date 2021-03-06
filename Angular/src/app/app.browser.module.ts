import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    
@NgModule({
       bootstrap: [AppComponent],

       imports:[
              BrowserModule.withServerTransition({appId: 'app-root'}),
              AppModule,
              BrowserTransferStateModule,
              BrowserAnimationsModule,
       ]
})
export class AppBrowserModule {}
    