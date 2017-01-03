import {Component,ElementRef,NgZone, OnInit, ViewChild,Output,EventEmitter} from '@angular/core';
import {SebmGoogleMap, MapsAPILoader,MouseEvent} from 'angular2-google-maps/core';
//import {HeaderComponent} from './components/header.component';
//import {MapFilterComponent} from './components/mapfilter.component';
//import {FooterComponent} from './components/footer.component';
import { FormControl } from "@angular/forms";

@Component({
  selector:'map',
  templateUrl:'./app/components/map.component.html',
  styleUrls:['./app/css/map.component.css']
})

export class MapComponent{

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public draggable: boolean;

  @ViewChild("mapSearch")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    //set google maps defaults
    this.zoom = 12;
    this.latitude = 51.75924850000001;
    this.longitude = 19.45598330000007;
    console.log(this.searchElementRef);
    //create search FormControl
    this.searchControl = new FormControl();
    this.draggable = true;

    //set current position
    //this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 12;
        this.draggable = true;
        });
      });
    });
    console.log(this.latitude);
    console.log(this.longitude);
    console.log(this.zoom);
  }

  private setCurrentPosition() {
      if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 6;
        });
      }
    }

  markerDragEnd(event: MouseEvent) {
     console.log('dragEnd', event);
     this.latitude = event.coords.lat;
     this.longitude = event.coords.lng;
  }

  onNotify(data:Object){
     data["latitude"] = this.latitude;
     data["longitude"] = this.longitude;
     console.log(data);
  }
}
