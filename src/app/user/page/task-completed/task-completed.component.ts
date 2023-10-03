import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CompleteTask } from 'src/app/professional/types/professional.types';
import { getCompletedTask } from '../../store/user.action';
import { selectCompletedTaskData, selectCompletedTaskLoading, selectCompletedTotalTask } from '../../store/user.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-completed',
  templateUrl: './task-completed.component.html',
  styleUrls: ['./task-completed.component.css']
})
export class TaskCompletedComponent implements OnInit, OnDestroy{
  tasks !: CompleteTask[]
  loading$ !: boolean

  pageCount : number = 1
  limit : number = 5
  totalPage !: number 

  taskSubscription : Subscription
  loadingSubscription : Subscription
  totalPageSubscription : Subscription

  constructor(
    private readonly _store : Store
  ){
    this.taskSubscription = this._store.pipe(select(selectCompletedTaskData)).subscribe((tasks)=> {
      this.tasks = tasks
    })
    this.loadingSubscription = this._store.pipe(select(selectCompletedTaskLoading)).subscribe((loading)=> {
      this.loading$ = loading
    })
    this.totalPageSubscription = this._store.pipe(select(selectCompletedTotalTask)).subscribe((totalPage)=> {
      this.totalPage = Math.ceil(totalPage as number / this.limit)
    })
  }

  ngOnInit(): void {
    const page = this.pageCount
    this._store.dispatch(getCompletedTask({page}))
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
    this._store.dispatch(getCompletedTask({page}))
  }

  prevPage(){
    this.pageCount --
    const page = this.pageCount
    this._store.dispatch(getCompletedTask({page}))
  }

  ngOnDestroy(): void {
    this.taskSubscription.unsubscribe()
    this.loadingSubscription.unsubscribe()
    this.totalPageSubscription.unsubscribe()
  }
}
