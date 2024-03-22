import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() task!:Task[];
  @Input() route!:string;
  @Output() delete = new EventEmitter();
  count=0;
  completed=0;
  ngOnChanges(){
    this.count = 0;
    this.completed = 0;
    this.task.forEach(( item:Task)=>{
      if (!item.completed) {
        this.count++;
      }else{
        this.completed++;
      }
    });
  }

  deleteCompleted(){
    this.delete.emit();
  }
}
