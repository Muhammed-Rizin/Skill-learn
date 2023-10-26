import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompleteSchedule } from '../../types/professional.types';
import { Store, select } from '@ngrx/store';
import { selectCompletedScheduleData, selectCompletedScheduleLoading, selectCompletedTotalSchedule } from '../../store/professional.selector';
import { getCompletedSchedule } from '../../store/professional.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scheduled-completed',
  templateUrl: './scheduled-completed.component.html',
  styleUrls: ['./scheduled-completed.component.css']
})
export class ScheduledCompletedComponent implements OnInit, OnDestroy {
  meetings !: CompleteSchedule[]
  loading$ !: boolean
    
  pageCount : number = 1
  limit : number = 5
  totalPage !: number 

  scheduleSubscription : Subscription
  loadingSubscription : Subscription
  totalSubscription : Subscription

  constructor(
    private readonly _store : Store
  ){
    this.scheduleSubscription = this._store.pipe(select(selectCompletedScheduleData)).subscribe((meetings)=> {
      this.meetings = meetings
    })
    this.loadingSubscription = this._store.pipe(select(selectCompletedScheduleLoading)).subscribe((loading)=> {
      this.loading$ = loading
    })
    this.totalSubscription = this._store.pipe(select(selectCompletedTotalSchedule)).subscribe((total)=> {
      this.totalPage = Math.ceil(total / this.limit)
    })
  }

  ngOnInit(): void {
    const page = this.pageCount
    this._store.dispatch(getCompletedSchedule({page}))
  }

  getTime (time :string) {
    const currentDate = new Date(time);
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  ngOnDestroy(): void {
    this.scheduleSubscription?.unsubscribe()
    this.loadingSubscription?.unsubscribe()
    this.totalSubscription?.unsubscribe()
  }
  
  nextPage() {
    this.pageCount ++ 
    const page = this.pageCount
    this._store.dispatch(getCompletedSchedule({page}))
  }

  prevPage(){
    this.pageCount --
    const page = this.pageCount
    this._store.dispatch(getCompletedSchedule({page}))
  }
}
