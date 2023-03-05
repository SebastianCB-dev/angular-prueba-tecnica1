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
  
  // Form
  public taskForm: FormGroup = this.fb.group({
    'task-description': ['', [Validators.required, Validators.minLength(3)]],
    'task-date': [formatDate(this.getDate(), 'yyyy-MM-dd', 'en'), 
                  [Validators.required]]
  })

  constructor(private fb: FormBuilder,
              public taskSrv: TaskService) {
  }

  // Return today's date
  getDate() {
    return new Date();
  }

  createTask() {
    if(this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    this.taskForm.value._id = uuid.v4();
    const data = this.taskForm.value;
    this.taskSrv.addTask(data)
  }

  isNotValidControl(control: string): boolean {
    return this.taskForm.get(control)!.touched &&
           this.taskForm.get(control)!.invalid
  } 
}
