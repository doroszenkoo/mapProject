import { Component, ElementRef, NgZone, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MapsAPILoader, MouseEvent } from 'angular2-google-maps/core';
import { FormControl } from "@angular/forms";
import { RouteDirective } from './route.directive';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector:'map',
  templateUrl:'./app/components/map/map.component.html',
  styleUrls:['./app/css/map.component.css']
})

@Injectable()
export class MapComponent{
    public latitude: number;
    public longitude: number;
    public originInput: FormControl;
    public destinationInput: FormControl;
    public centerInput: FormControl;
    public zoom: number;
    public iconurl: string;
    public mapCustomStyles : any;
    public estimatedTime: any;
    public estimatedDistance: any;

    
    @ViewChild("mapCenter")
    public mapCenter: ElementRef;

    @ViewChild("pickupOriginInput")
    public pickupOriginInputElementRef: ElementRef;

    @ViewChild("pickupDestinationInput")
    public pickupDestinationInputElementRef: ElementRef;

    @ViewChild(RouteDirective) vc: RouteDirective;

    public origin :any ; // its a example aleatory position
    public destination : any; // its a example aleatory position
    constructor(
      
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private _elementRef : ElementRef,
      private _http: Http
    ) {
    }
    
    ngOnInit() {
      //set google maps defaults
      this.zoom = 10;
      this.latitude = 39.8282;
      this.longitude = -98.5795;
      //this.iconurl = '../image/map-icon.png';
      this.mapCustomStyles = this.getMapCusotmStyles();
      console.log(this.mapCustomStyles);
      //create search FormControl
      this.centerInput = new FormControl();
      this.originInput = new FormControl();
      this.destinationInput = new FormControl();
      //set current position
      this.setCurrentPosition();
      
      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
          let autocompleteCenter = new google.maps.places.Autocomplete(this.mapCenter.nativeElement, {
            types: ["geocode"]
          });
          let autocompleteOrigin = new google.maps.places.Autocomplete(this.pickupOriginInputElementRef.nativeElement, {
            types: ["geocode"]
          });

          let autocompleteDestination = new google.maps.places.Autocomplete(this.pickupDestinationInputElementRef.nativeElement, {
            types: ["geocode"]
          });
          this.setupPlaceChangedListener(autocompleteCenter,'CNTR')
          this.setupPlaceChangedListener(autocompleteOrigin, 'ORG');
          this.setupPlaceChangedListener(autocompleteDestination, 'DES');
      });
    }
  

    private setupPlaceChangedListener(autocomplete: any, mode: any ) {
      autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              //get the place result
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();
              //verify result
              if (place.geometry === undefined) {
                return;
              }
              if(mode === 'CNTR'){
                 this.latitude = place.geometry.location.lat();
                 this.longitude = place.geometry.location.lng();
              }
              if (mode === 'ORG') {
                  this.vc.origin = { longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() }; 
                  this.vc.originPlaceId = place.place_id;
              } 
              if(mode === 'DES') {
                  this.vc.destination = { longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() }; // its a example aleatory position
                  this.vc.destinationPlaceId = place.place_id;
              }
  
              if(this.vc.directionsDisplay === undefined){ this.mapsAPILoader.load().then(() => { 
                    this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
                  }); 
              }
          
              //Update the directions
              this.vc.updateDirections();
              this.zoom = 12;
            });

         });

    }

    getDistanceAndDuration(){
      this.estimatedTime = this.vc.estimatedTime;
      this.estimatedDistance = this.vc.estimatedDistance;
    }


    private setPickUpLocation( place:any ) {
      //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;
    }

    private setCurrentPosition() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log(this.latitude);
          console.log(this.longitude);
          this.zoom = 12;
        });
      }
    }

    private getMapCusotmStyles() {
      // Write your Google Map Custom Style Code Here.
       var options = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ffff00"
      },
      {
        "weight": 2
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
];
      //console.log(map);
      return options;
      //map.setOptions(options);
    }

    private  markerDragEnd(event: MouseEvent) {
      console.log('dragEnd', event);
      this.latitude = event.coords.lat;
      this.longitude = event.coords.lng;
    }

    private onNotify(data:Object){
      data["latitude"] = this.latitude;
      data["longitude"] = this.longitude;
      data["originLatitude"] = this.vc.origin.latitude;
      data["originLongitude"] = this.vc.origin.longitude;
      data["destinationLatitude"] = this.vc.destination.latitude;
      data["destinationLongitude"] = this.vc.destination.longitude;  
      data["mapStyle"] = JSON.stringify(this.mapCustomStyles); 
      var json = JSON.stringify(data);
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers }); // Create a request option
     console.log(data);
     // var headers = new Headers();
    //  headers.append('Content-Type','application/x-www-from-urlencoded');
      //console.log(json);
      this._http.post('http://localhost:8080/run',data, options)   
      .map(res => res.json())
      .subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log('Done!')
        
        
      );
        // .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        // .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if
    }
}
