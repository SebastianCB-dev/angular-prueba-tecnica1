import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public tasks: Task[] = [];

  constructor() {
    this.loadTasks();
  }  

  loadTasks() {
    const tasks = localStorage.getItem('tasks-angular');
    if(tasks) {
      this.tasks = JSON.parse(tasks);
      return;
    }
    this.tasks = [];
    return;
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks-angular', JSON.stringify(this.tasks));
  }

  deleteTask(id: string) {
    if(this.existsTaskByID(id)) {      
      this.tasks = this.tasks.filter((task) => task._id !== id);            
      this.saveTasks();
    }
  }

  existsTaskByID(id: string) {
    return this.tasks.find((task) => task._id === id)
  }
}
