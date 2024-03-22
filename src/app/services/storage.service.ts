import { Injectable } from '@angular/core';
import {Task} from '../models/task.model';
import { State } from '../models/state.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  nameLocalStorage = 'mydayapp-angular';
  task$= new BehaviorSubject<Task[]>([]);
  constructor() { }

  addTask(task:Task){
    this.validator();
    this.task$.next([...this.task$.getValue(), task]);
    this.setData();
  }

  readTask(){
    this.validator();
  }

  private validator(){
    const storage = localStorage.getItem(this.nameLocalStorage);
    if (storage) {
      this.task$.next(JSON.parse(storage));
    }
  }

  private setData(){
    const data = JSON.stringify(this.task$.getValue());
    localStorage.setItem(this.nameLocalStorage, data);
  }

  changeState(data:State){
    this.validator();
    let datos = this.task$.getValue();
    switch(data.action){
      case 'completed':
        datos.forEach((element, index)=>{
          if (element.id == data.id) {
            datos[index].completed = !datos[index].completed;
          }
        });
        break;
      case 'edit':
        datos.forEach((element, index)=>{
          if (element.id == data.id) {
            datos[index].editing = !datos[index].editing;
          }
        });
        break;
      case 'editTitle':
        datos.forEach((element, index)=>{
          if (element.id == data.id) {
            datos[index].editing = !datos[index].editing;
            datos[index].title = data.title || '';
          }
        });
        break;
    }
    this.task$.next(datos);
    this.setData();
  }

  deleteCompleted(){
    this.validator();
    this.task$.next(this.task$.getValue().filter((item)=>!item.completed));
    this.setData();
  }
}
