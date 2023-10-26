import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompleteSchedule } from '../../types/professional.types';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { Store, select } from '@ngrx/store';
import { selectInprogressScheduleData, selectInprogressScheduleLoading, selectInprogressTotalSchedule } from '../../store/professional.selector';
import { getInprogressSchedule } from '../../store/professional.actions';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css']
})
export class ScheduledComponent implements OnInit, OnDestroy{
  meetings !: CompleteSchedule[]
  loading$ !: boolean
  
  pageCount : number = 1
  limit : number = 5
  totalPage !: number
  
  scheduleSubscription : Subscription
  loadingSubscription : Subscription
  totalSubscription : Subscription
  taskDoneSubscription !: Subscription

  constructor(
    private readonly _store : Store,
    private readonly _professionalService : ProfessionalService,
    private readonly _router : Router
  ){
    this.scheduleSubscription = this._store.pipe(select(selectInprogressScheduleData)).subscribe((meetings)=> {
      this.meetings = meetings
    })
    this.loadingSubscription = this._store.pipe(select(selectInprogressScheduleLoading)).subscribe((loading)=> {
      this.loading$ = loading
    })
    this.totalSubscription = this._store.pipe(select(selectInprogressTotalSchedule)).subscribe((total)=> {
      this.totalPage = Math.ceil(total / this.limit)
    })
  }

  ngOnInit(): void {
    const page = this.pageCount
    this._store.dispatch(getInprogressSchedule({page}))
  }

  ngOnDestroy(): void {
    this.scheduleSubscription?.unsubscribe()
    this.loadingSubscription?.unsubscribe()
    this.totalSubscription?.unsubscribe()
    this.taskDoneSubscription?.unsubscribe()
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

  taskDone(id : string) {
    this.taskDoneSubscription = this._professionalService.meetingDone(id).subscribe(
      (data)=> {
        const page = this.pageCount
        this._store.dispatch(getInprogressSchedule({page}))
      },
      (err) => {
        if(err.status == 500) {
          localStorage.setItem('server-error' , 'server-error')
          this._router.navigate(['/server-error'])
        }
      }
    )
  }
}
