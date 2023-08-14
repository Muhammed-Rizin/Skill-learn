import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CompleteTask } from 'src/app/professional/types/professional.types';
import { UserService } from 'src/app/services/user/user.service';
import { getCompletedTask } from '../../store/user.action';
import { selectCompletedTaskData, selectCompletedTaskLoading, selectCompletedTotalTask } from '../../store/user.selector';

@Component({
  selector: 'app-task-completed',
  templateUrl: './task-completed.component.html',
  styleUrls: ['./task-completed.component.css']
})
export class TaskCompletedComponent {
  tasks !: CompleteTask[]
  loading$ !: boolean

  pageCount : number = 1
  limit : number = 5
  totalPage !: number 


  constructor(
    private readonly _userService : UserService,
    private readonly _store : Store
  ){
    this._store.pipe(select(selectCompletedTaskData)).subscribe((tasks)=> {
      this.tasks = tasks
    })
    this._store.pipe(select(selectCompletedTaskLoading)).subscribe((loading)=> {
      this.loading$ = loading
    })
    this._store.pipe(select(selectCompletedTotalTask)).subscribe((totalPage)=> {
      this.totalPage = Math.ceil(totalPage as number / this.limit)
    })
  }

  ngOnInit(): void {
    const page = this.pageCount
    this._store.dispatch(getCompletedTask({page}))
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
    this._store.dispatch(getCompletedTask({page}))
  }

  prevPage(){
    this.pageCount --
    const page = this.pageCount
    this._store.dispatch(getCompletedTask({page}))
  }
}
