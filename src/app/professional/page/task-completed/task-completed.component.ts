import { Component, OnInit } from '@angular/core';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { CompleteTask } from '../../types/professional.types';
import { Store, select } from '@ngrx/store';
import { getCompletedTask } from '../../store/professional.actions';
import { selectCompletedTaskData, selectCompletedTaskLoading } from '../../store/professional.selector';

@Component({
  selector: 'app-task-completed',
  templateUrl: './task-completed.component.html',
  styleUrls: ['./task-completed.component.css']
})
export class TaskCompletedComponent implements OnInit{
  tasks !: CompleteTask[]
  loading$ !: boolean
  constructor(
    private readonly _store: Store
  ){
    this._store.pipe(select(selectCompletedTaskData)).subscribe((tasks)=> {
      this.tasks = tasks
    })
    this._store.pipe(select(selectCompletedTaskLoading)).subscribe((loading)=> {
      this.loading$ = loading
    })
  }

  ngOnInit(): void {
    this._store.dispatch(getCompletedTask())
  }

  getTime (time :string) {
    const currentDate  = new Date(time)
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    return `${hours}:${minutes}`
  }
}
