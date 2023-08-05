import { Component } from '@angular/core';
import { CompleteTask } from 'src/app/professional/types/professional.types';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-task-completed',
  templateUrl: './task-completed.component.html',
  styleUrls: ['./task-completed.component.css']
})
export class TaskCompletedComponent {
  tasks !: CompleteTask[]
  constructor(
    private readonly _userService : UserService
  ){}

  ngOnInit(): void {
      this._userService.getCompletedTask().subscribe(
        (data) => this.tasks = data
      )
  }
}
