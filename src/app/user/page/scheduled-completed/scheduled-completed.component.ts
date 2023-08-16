import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CompleteSchedule } from 'src/app/professional/types/professional.types';
import { UserService } from 'src/app/services/user/user.service';
import { selectCompletedScheduleData, selectCompletedScheduleLoading, selectCompletedTotalSchedule } from '../../store/user.selector';
import { getCompletedSchedule } from '../../store/user.action';

@Component({
  selector: 'app-scheduled-completed',
  templateUrl: './scheduled-completed.component.html',
  styleUrls: ['./scheduled-completed.component.css']
})
export class ScheduledCompletedComponent implements OnInit {
  tasks !: CompleteSchedule[]
  loading$ !: boolean

  pageCount : number = 1
  limit : number = 5
  totalPage !: number 

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
    this._store.pipe(select(selectCompletedTotalSchedule)).subscribe((total)=> {
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
