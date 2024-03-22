import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { State } from 'src/app/models/state.model';
import { Task } from 'src/app/models/task.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  serviceStorage = inject(StorageService);
  task$= this.serviceStorage.task$;
  taskFiltered$ = new BehaviorSubject<Task[]>([]);
  route!:string;
  data= false;
  constructor(private router:Router) {
  }
  
  ngOnInit(): void {
    this.serviceStorage.readTask();
    this.route = this.router.url;
    this.task$.subscribe((task)=>{
      this.data = task.length>0;
    });
    this.filterData();
  }

  addTask(title:string){
    const data:Task = {
      id:new Date().toISOString(),
      title,
      completed:false
    }
    this.serviceStorage.addTask(data);
    this.filterData();
    this.task$.subscribe((task)=>{
      this.data = task.length>0;
    });
  }

  changeState(data:State){
    this.serviceStorage.changeState(data);
    this.filterData();
    this.task$.subscribe((task)=>{
      this.data = task.length>0;
    });
  }

  deleteCompleted(){
    this.serviceStorage.deleteCompleted();
    this.filterData();
    this.task$.subscribe((task)=>{
      this.data = task.length>0;
    });
  }

  filterData(){
    let task = this.task$.getValue();
    switch(this.route){
      case "/pending":
        this.taskFiltered$.next(task.filter((item)=> !item.completed));
        break;
      case "/completed":
        this.taskFiltered$.next(task.filter((item)=> item.completed));
        break;
      default:
        this.taskFiltered$.next(task);
        break;
    }
    
  }
}
