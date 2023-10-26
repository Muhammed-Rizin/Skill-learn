import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompleteTask } from '../../types/professional.types';
import { Store, select } from '@ngrx/store';
import { getCompletedTask } from '../../store/professional.actions';
import { selectCompletedTaskData, selectCompletedTaskLoading, selectCompletedTotalTask } from '../../store/professional.selector';
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
  totalSubscription : Subscription
  
  constructor(
    private readonly _store: Store
  ){
    this.taskSubscription = this._store.pipe(select(selectCompletedTaskData)).subscribe((tasks)=> {
      this.tasks = tasks
    })
    this.loadingSubscription = this._store.pipe(select(selectCompletedTaskLoading)).subscribe((loading)=> {
      this.loading$ = loading
    })
    this.totalSubscription = this._store.pipe(select(selectCompletedTotalTask)).subscribe((total)=> {
      this.totalPage = Math.ceil(total / this.limit)
    })
  }

  ngOnInit(): void {
    const page = this.pageCount
    this._store.dispatch(getCompletedTask({page}))
  }

  ngOnDestroy(): void {
    this.taskSubscription?.unsubscribe()
    this.loadingSubscription?.unsubscribe()
    this.totalSubscription?.unsubscribe()
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
}
