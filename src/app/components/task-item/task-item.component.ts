import { Component, Input } from '@angular/core';

import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {

  @Input() task!: Task;
  constructor(private taskSrv: TaskService) {}

  eliminarTarea(id: string) {
    this.taskSrv.deleteTask(id);
  }

  getClassByStatus() {
    if(this.task.isDone) {
      return 'text-success';
    }
    return 'text-warning';
  }

  updateStatus() {
    this.taskSrv.updateStatus(this.task._id);
  }
}
