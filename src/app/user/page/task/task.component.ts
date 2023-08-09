import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CompleteTask } from 'src/app/professional/types/professional.types';
import { UserService } from 'src/app/services/user/user.service';
import { getInprogressTask } from '../../store/user.action';
import { selectInprogressTaskData, selectInprogressTaskLoading } from '../../store/user.selector';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  tasks !: CompleteTask[]
  loading$ !: boolean
  constructor(
    private readonly _userService : UserService,
    private readonly _store : Store
  ){
    this._store.pipe(select(selectInprogressTaskData)).subscribe((tasks)=> {
      this.tasks = tasks
    })
    this._store.pipe(select(selectInprogressTaskLoading)).subscribe((loading)=> {
      this.loading$ = loading
    })
  }

  ngOnInit(): void {
      this._store.dispatch(getInprogressTask())
  }

  getTime (time :string) {
    const currentDate  = new Date(time)
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    return `${hours}:${minutes}`
  }

  taskDone(taskId : string) {
    this._userService.taskDone(taskId).subscribe((data)=> {
      this._store.dispatch(getInprogressTask())
    })
  }
}
