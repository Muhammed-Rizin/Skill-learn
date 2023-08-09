import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CompleteSchedule } from 'src/app/professional/types/professional.types';
import { UserService } from 'src/app/services/user/user.service';
import { selectInprogressScheduleData, selectInprogressScheduleLoading } from '../../store/user.selector';
import { getCompletedSchedule, getInprogressSchedule } from '../../store/user.action';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css']
})
export class ScheduledComponent implements OnInit{
  tasks !: CompleteSchedule[]
  loading$ !: boolean
  constructor(
    private readonly _userService : UserService,
    private readonly _store : Store
  ){
    this._store.pipe(select(selectInprogressScheduleData)).subscribe((tasks)=> {
      this.tasks = tasks
    })
    this._store.pipe(select(selectInprogressScheduleLoading)).subscribe((loading)=> {
      this.loading$ = loading
    })
  }

  ngOnInit(): void {
    this._store.dispatch(getInprogressSchedule())
  }

  getTime (time :string) {
    const currentDate  = new Date(time)
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    return `${hours}:${minutes}`
  }
}