import { Component, OnInit } from '@angular/core';
import { CompleteSchedule } from '../../types/professional.types';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { Store, select } from '@ngrx/store';
import { selectInprogressScheduleData, selectInprogressScheduleLoading, selectInprogressTotalSchedule } from '../../store/professional.selector';
import { getInprogressSchedule } from '../../store/professional.actions';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css']
})
export class ScheduledComponent implements OnInit {
  tasks !: CompleteSchedule[]
  loading$ !: boolean
  
  pageCount : number = 1
  limit : number = 5
  totalPage !: number 

  constructor(
    private readonly _store : Store
  ){
    this._store.pipe(select(selectInprogressScheduleData)).subscribe((tasks)=> {
      this.tasks = tasks
    })
    this._store.pipe(select(selectInprogressScheduleLoading)).subscribe((loading)=> {
      this.loading$ = loading
    })
    this._store.pipe(select(selectInprogressTotalSchedule)).subscribe((total)=> {
      this.totalPage = Math.ceil(total / this.limit)
    })
  }

  ngOnInit(): void {
    const page = this.pageCount
    this._store.dispatch(getInprogressSchedule({page}))
  }

  getTime (time :string) {
    const currentDate = new Date(time);
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  nextPage() {
    this.pageCount ++ 
    const page = this.pageCount
    this._store.dispatch(getInprogressSchedule({page}))
  }

  prevPage(){
    this.pageCount --
    const page = this.pageCount
    this._store.dispatch(getInprogressSchedule({page}))
  }
}
