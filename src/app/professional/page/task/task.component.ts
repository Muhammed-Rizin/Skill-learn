import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { CompleteTask } from '../../types/professional.types';
import { selectInprogressTaskData, selectInprogressTaskLoading } from '../../store/professional.selector';
import { getInprogressTask } from '../../store/professional.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  tasks !: CompleteTask[]
  loading$ : boolean = true
  constructor(
    private readonly _store : Store
  ){
    this._store.pipe(select(selectInprogressTaskData)).subscribe((tasks)=> {
      this.tasks = tasks
    })
    this._store.pipe(select(selectInprogressTaskLoading)).subscribe((loading)=> {
      this.loading$ = loading
    })
  }

  ngOnInit(): void {
    this._store.dispatch(getInprogressTask())
  }

  getTime (time :string) {
    const currentDate  = new Date(time)
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    return `${hours}:${minutes}`
  }
}
