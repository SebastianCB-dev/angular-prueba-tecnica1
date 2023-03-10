import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import * as uuid from 'uuid';

import { Task } from './interfaces/task';
import { TaskService } from './services/task.service';


const myId = uuid.v4();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isSearching = false;
  public resultsQuery: Task[] = [];
  // Form
  public taskForm: FormGroup = this.fb.group({
    'task-description': ['', [Validators.required, Validators.minLength(3)]],
    'task-date': [formatDate(this.getDate(), 'yyyy-MM-dd', 'en'), 
                  [Validators.required]],
    'task-category': ['Personal', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
              public taskSrv: TaskService) {
  }

  // Return today's date
  getDate() {
    return new Date();
  }

  createTask() {   
    // Trim the description
    this.taskForm.controls['task-description']
      .setValue(this.taskForm.controls['task-description'].value.trim());
    if(this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    this.taskForm.value._id = uuid.v4();
    this.taskForm.value.isDone = false;
    const data = this.taskForm.value;
    this.taskSrv.addTask(data);
    this.taskForm.reset({
      'task-date': formatDate(this.getDate(), 'yyyy-MM-dd', 'en'),
      'task-category': 'Personal'
    });

  }

  isNotValidControl(control: string): boolean {
    return this.taskForm.get(control)!.touched &&
           this.taskForm.get(control)!.invalid
  } 

  searchTasks(query: string, category: string) {
    let result = [...this.taskSrv.tasks];
    if(query.trim().length === 0 && category === 'Todas') {
      return [...this.taskSrv.tasks];
    }
    this.taskSrv.loadTasks();
    if (category !== 'Todas') {
      result = result.filter((task) => task['task-category'] === category);
    }
    if (query.trim().length !== 0) {
      result = result.filter((task) => task['task-description'].includes(query));
    }
    return result;
  }
}
