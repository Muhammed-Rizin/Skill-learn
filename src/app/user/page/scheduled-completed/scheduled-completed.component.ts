import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CompleteSchedule } from 'src/app/professional/types/professional.types';
import { UserService } from 'src/app/services/user/user.service';
import { selectCompletedScheduleData, selectCompletedScheduleLoading } from '../../store/user.selector';
import { getCompletedSchedule } from '../../store/user.action';

@Component({
  selector: 'app-scheduled-completed',
  templateUrl: './scheduled-completed.component.html',
  styleUrls: ['./scheduled-completed.component.css']
})
export class ScheduledCompletedComponent implements OnInit {
  tasks !: CompleteSchedule[]
  loading$ !: boolean
  constructor(
    private readonly _userService : UserService,
    private readonly _store : Store
  ){
    this._store.pipe(select(selectCompletedScheduleData)).subscribe((tasks)=> {
      this.tasks = tasks
    })
    this._store.pipe(select(selectCompletedScheduleLoading)).subscribe((loading)=> {
      this.loading$ = loading
    })
  }


  ngOnInit(): void {
      this._store.dispatch(getCompletedSchedule())
  }

  getTime (time :string) {
    const currentDate  = new Date(time)
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    return `${hours}:${minutes}`
  }
}
