import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { CompleteTask } from '../../types/professional.types';
import { selectInprogressTaskData, selectInprogressTaskLoading, selectInprogressTotalTask } from '../../store/professional.selector';
import { getInprogressTask } from '../../store/professional.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  tasks !: CompleteTask[]
  loading$ : boolean = true
      
  pageCount : number = 1
  limit : number = 5
  totalPage !: number 

  constructor(
    private readonly _store : Store
  ){
    this._store.pipe(select(selectInprogressTaskData)).subscribe((tasks)=> {
      this.tasks = tasks
    })
    this._store.pipe(select(selectInprogressTaskLoading)).subscribe((loading)=> {
      this.loading$ = loading
    })
    this._store.pipe(select(selectInprogressTotalTask)).subscribe((total)=> {
      this.totalPage = Math.ceil(total / this.limit)
    })
  }

  ngOnInit(): void {
    const page = this.pageCount
    this._store.dispatch(getInprogressTask({page}))
  }

  getTime (time :string) {
    const currentDate  = new Date(time)
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    return `${hours}:${minutes}`
  }

  nextPage() {
    this.pageCount ++ 
    const page = this.pageCount
    this._store.dispatch(getInprogressTask({page}))
  }

  prevPage(){
    this.pageCount --
    const page = this.pageCount
    this._store.dispatch(getInprogressTask({page}))
  }
}
