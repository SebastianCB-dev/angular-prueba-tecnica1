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
  @Input() index!: number;
  constructor(private taskSrv: TaskService) {}

  eliminarTarea(id: string) {
    this.taskSrv.deleteTask(id);
  }
}
