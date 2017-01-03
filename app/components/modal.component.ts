import {Component, ViewChild, ElementRef} from "@angular/core";
import { ModalDirective } from 'ng2-bootstrap';
import {FormControl,FormGroup,Validators,FormBuilder} from '@angular/forms';

@Component({
  selector:'modal',
  templateUrl:'./app/components/modal.component.html',
})

export class ModalComponent {
  @ViewChild('ModalRegister') registrationModal:ModalDirective;
  @ViewChild('ModalLogin') loginModal:ModalDirective;
  //constructor(fb:FormBuilder)
  public emailPattern = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;


  //public registerForm = new FormGroup({
  //  name: new FormControl(),
  //  email: new FormControl(),
  //  password: new FormControl(),
  //  repassword: new FormControl(),
  //})
signIn:FormGroup;
registerForm:FormGroup;
constructor(fb:FormBuilder){
    this.signIn = fb.group({
      'email':[null,[Validators.required,Validators.pattern(this.emailPattern)]],
      'password': [null,Validators.required],
      'check':[false]
    })
    this.registerForm = fb.group({
      'name': [null,Validators.required],
      'email': [null,[Validators.required,Validators.pattern(this.emailPattern)]],
      'password': [null,Validators.required],
      'repassword': [null,Validators.required],
    })
}

  //public signIn = new FormGroup({
  //  email: new FormControl(null,[Validators.required,Validators.pattern(this.emailPattern)]),
  //  password: new FormControl(null,[Validators.required]),
  //  check: new FormControl(null,[Validators.required])
  //});

  showRegistrationModal() {
      console.log(this.registrationModal);
      this.registrationModal.show();
  }
  showLoginModal(){
    console.log(this.loginModal);
    this.loginModal.show();
  }
  validateRegistrationData(event:any){
    let registerFormData=this.registerForm.value;
    console.log(registerFormData);
  }
  validateSignInData(event:any){
    let signInFormData=this.signIn.value;
    console.log(signInFormData);
  }
}
