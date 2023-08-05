import { Component } from '@angular/core';
import { CompleteTask } from 'src/app/professional/types/professional.types';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  tasks !: CompleteTask[]
  constructor(
    private readonly _userService : UserService
  ){}

  ngOnInit(): void {
      this._userService.getInProgressTask().subscribe(
        (data) => this.tasks = data
      )
  }

  taskDone(taskId : string) {
    this._userService.taskDone(taskId).subscribe()
  }
}
