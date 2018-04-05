import { EventEmitter, Output, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'map-form',
  templateUrl:'./app/components/map/map-form.component.html',
  styleUrls:['./app/css/map-form.component.css']
})

export class MapFormComponent {
  public createMapForm:FormGroup;
  public zoomRange = /^[1-9]$|^[1-2][0-4]$/; //range from 1-24
  public numeric = /^[0-9]+$/;
  public formData: any;
  public zoom: number;
  public width: number;
  public height: number;
  constructor(
    private fb:FormBuilder,
    private _http:Http
  ){
    this.createMapForm = this.fb.group({
    'zoom' : [null, [Validators.required,Validators.pattern(this.zoomRange)]],
    'width' : [null,[Validators.required,Validators.pattern(this.numeric)]],
    'height' : [null, [Validators.required,Validators.pattern(this.numeric)]],
    })
  }
  
  @Output()
  notify: EventEmitter<number> = new EventEmitter<number>();
  
  sendData(event:any) {
    this.formData = this.createMapForm.value;
    this.zoom = this.formData["zoom"];
    this.width = this.formData["width"];
    this.height = this.formData["height"];
    this.notify.emit(this.formData);
    //var json = JSON.stringify('');
    //return this._http.post('http://localhost:8080/run',json)
    //   .map((res:Response) => res.json());
   }
}
