import {EventEmitter,Output,Component,ViewChild,ElementRef} from '@angular/core';
import {FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms';
import {GoogleplaceDirective} from 'angular2-google-map-auto-complete/directives/googleplace.directive';


@Component({
  selector: 'map-form',
  templateUrl:'./app/components/map-form.component.html',
  styleUrls:['./app/css/map-form.component.css']
})

export class MapFormComponent {
  public createMapForm:FormGroup;
  public zoomRange = /^[1-9]$|^[1-2][0-4]$/; //range from 1-24
  public numeric = /^[0-9]+$/;
  constructor(fb:FormBuilder){
    this.createMapForm = fb.group({
    'zoom' : [null, [Validators.required,Validators.pattern(this.zoomRange)]],
    'width' : [null,[Validators.required,Validators.pattern(this.numeric)]],
    'height' : [null, [Validators.required,Validators.pattern(this.numeric)]]
    })
  }
  @Output()
  notify: EventEmitter<string> = new EventEmitter<string>();
  sendData(event:any) {
    let formData = this.createMapForm.value;
    console.log(formData);
    this.notify.emit(formData);
   }
}
