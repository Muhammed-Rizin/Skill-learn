import { Component, OnInit } from '@angular/core';
import { CompleteSchedule } from '../../types/professional.types';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { Store, select } from '@ngrx/store';
import { selectCompletedScheduleData, selectCompletedScheduleLoading } from '../../store/professional.selector';
import { getCompletedSchedule } from '../../store/professional.actions';

@Component({
  selector: 'app-scheduled-completed',
  templateUrl: './scheduled-completed.component.html',
  styleUrls: ['./scheduled-completed.component.css']
})
export class ScheduledCompletedComponent implements OnInit {
  tasks !: CompleteSchedule[]
  loading$ !: boolean
  constructor(
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
