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

  getTime (time :string) {
    const currentDate  = new Date(time)
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    return `${hours}:${minutes}`
  }

  taskDone(taskId : string) {
    this._userService.taskDone(taskId).subscribe()
  }
}
