import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapFormComponent } from './map/map-form.component';
import { MapComponent } from './map/map.component';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseModule, ModalModule  } from 'ng2-bootstrap';
import { GoogleplaceDirective } from 'angular2-google-map-auto-complete/directives/googleplace.directive';
import { AgmCoreModule, MapsAPILoader,GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { RouteDirective } from './map/route.directive';
import { HttpModule} from '@angular/http';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBsPyfbot8Rigi8maUudPGXzMFPZsAxrpM',
      libraries: ["places"]
    })
  ],
  providers: [GoogleMapsAPIWrapper],
  declarations: [ AppComponent, HeaderComponent, MapFormComponent, FooterComponent, ModalComponent, GoogleplaceDirective, MapComponent,RouteDirective ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
