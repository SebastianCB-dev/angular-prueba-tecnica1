import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { TaskService } from './services/task.service';
import { Task } from './interfaces/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public tasks: Task[] = [];
  // Form
  public taskForm: FormGroup = this.fb.group({
    'task-description': ['', [Validators.required, Validators.minLength(3)]],
    'task-date': [formatDate(this.getDate(), 'yyyy-MM-dd', 'en'), 
                  [Validators.required]]
  })

  constructor(private fb: FormBuilder,
              private taskSrv: TaskService) {
  }

  ngOnInit() {
  }
  // Return today's date
  getDate() {
    return new Date();
  }

  crearTarea() {
    if(this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    console.log(this.taskForm.value);
    // TODO: Crear Tarea
  }

  isNotValidControl(control: string): boolean {
    return this.taskForm.get(control)!.touched &&
           this.taskForm.get(control)!.invalid
  } 
}
