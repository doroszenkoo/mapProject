import { Component, ViewChild, ElementRef } from "@angular/core";
import { ModalDirective } from 'ng2-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector:'modal',
  templateUrl:'./app/components/modal/modal.component.html',
})

export class ModalComponent {
  @ViewChild('ModalRegister') registrationModal:ModalDirective;
  @ViewChild('ModalLogin') loginModal:ModalDirective;

  public emailPattern = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  public signIn:FormGroup;
  public registerForm:FormGroup;
  constructor(fb:FormBuilder){
      this.signIn = fb.group({
        'email':[null,[Validators.required,Validators.pattern(this.emailPattern)]],
        'password': [null,[Validators.required,Validators.minLength(8)]],
        'check':[false]
      })
      this.registerForm = fb.group({
        'name': [null,Validators.required],
        'email': [null,[Validators.required,Validators.pattern(this.emailPattern)]],
        'password': [null,[Validators.required,Validators.minLength(8)]],
        'repassword': [null,[Validators.required]]
      })
  }
  private showRegistrationModal() {
      console.log(this.registrationModal);
      this.registrationModal.show();
  }

  private showLoginModal(){
    console.log(this.loginModal);
    this.loginModal.show();
  }

  private validateRegistrationData(event:any){
    let registerFormData=this.registerForm.value;
    console.log(registerFormData);
  }

  private validateSignInData(event:any){
    let signInFormData=this.signIn.value;
    console.log(signInFormData);
  }

 areEqual(group: FormGroup) {
  var valid = false;
  var passValue = group.controls['password'].value;
  var repassValue = group.controls['repassword'].value;
  for (var name in group.controls) {
    var val = group.controls[name].value;
    console.log(name)
    console.log(val);
  }
  if (valid) {
    return null;
  }

  return {
    areEqual: true
  };
  /*if (passValue != null && repassValue != null && passValue === repassValue){
    console.log('The same');
    valid = true;
    //console.log(valid);
    return {areEqual:true}; 
  } else {
      //console.log(valid);
      return null;
  }*/
}
}
