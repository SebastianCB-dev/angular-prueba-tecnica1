import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _tasks: Task[] = [];

  constructor() {
    this.loadTasks();
  }  

  loadTasks() {
    const tasks = localStorage.getItem('tasks-angular');
    if(tasks) {
      this._tasks = JSON.parse(tasks);
      return;
    }
    this._tasks = [];
    return;
  }
}
