import { Component, OnInit } from '@angular/core';
import { CompleteSchedule } from '../../types/professional.types';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { Store, select } from '@ngrx/store';
import { selectCompletedScheduleData, selectCompletedScheduleLoading, selectInprogressScheduleData, selectInprogressScheduleLoading } from '../../store/professional.selector';
import { getCompletedSchedule, getInprogressSchedule } from '../../store/professional.actions';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css']
})
export class ScheduledComponent implements OnInit {
  tasks !: CompleteSchedule[]
  loading$ !: boolean
  constructor(
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
