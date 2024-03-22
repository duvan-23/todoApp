import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @Input() task:Task[]=[];
  @Output() changeState = new EventEmitter();
  @Output() changeTitle = new EventEmitter();

  change(id :string,action:string){
    this.changeState.emit({id,action});
  }

  editTitle(id:string, event:Event){
    const input = event.target as HTMLInputElement;
    const title = input.value.trim();
    if (title!='') {
      this.changeState.emit({id,action:'editTitle',title});
    }

  }
}
