import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { HeaderComponent } from './components/header.component';
//import { NavigationComponent } from './components/navigation.component';
//import { HeaderSearchComponent } from './components/headersearch.component';
import { MapFormComponent } from './components/map-form.component';
import {MapComponent} from './components/map.component';
import { FooterComponent } from './components/footer.component';
import {ModalComponent} from './components/modal.component';
//import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CollapseModule,ModalModule  } from 'ng2-bootstrap';
import {GoogleplaceDirective} from 'angular2-google-map-auto-complete/directives/googleplace.directive';
import { AgmCoreModule,MapsAPILoader } from 'angular2-google-maps/core';

@NgModule({
  imports: [
    BrowserModule,FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    //CollapseModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBsPyfbot8Rigi8maUudPGXzMFPZsAxrpM',
      libraries: ["places"]
    })
  ],
  providers: [],
  declarations: [ AppComponent, HeaderComponent, MapFormComponent,FooterComponent,ModalComponent,GoogleplaceDirective,MapComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
