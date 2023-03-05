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

  get tasks() {
    return this._tasks;
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

  addTask(task: Task) {
    this._tasks.push(task);
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks-angular', JSON.stringify(this._tasks));
  }
}
