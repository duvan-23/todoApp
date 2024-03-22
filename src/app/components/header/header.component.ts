import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() title= new EventEmitter;
  input = new FormControl('',{
    validators:[
      Validators.required
    ]
  });

  add(event:Event){
    const inputEvent = event.target as HTMLInputElement;
    const value = inputEvent.value.trim();
    if(value!=''){
      this.title.emit(value);
    }
    this.input.setValue('');
  }
}
