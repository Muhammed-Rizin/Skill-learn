import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CompleteTask } from 'src/app/professional/types/professional.types';
import { UserService } from 'src/app/services/user/user.service';
import { getInprogressTask } from '../../store/user.action';
import { selectInprogressTaskData, selectInprogressTaskLoading, selectInprogressTotalTask } from '../../store/user.selector';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {
  tasks !: CompleteTask[]
  loading$ !: boolean

  pageCount : number = 1
  limit : number = 5
  totalPage !: number 

  taskSubscription : Subscription
  loadingSubscription : Subscription
  totalPageSubscription : Subscription
  taskDoneSubscription !: Subscription

  constructor(
    private readonly _userService : UserService,
    private readonly _store : Store,
    private readonly _router : Router
  ){
    this.taskSubscription = this._store.pipe(select(selectInprogressTaskData)).subscribe((tasks)=> {
      this.tasks = tasks
    })
    this.loadingSubscription = this._store.pipe(select(selectInprogressTaskLoading)).subscribe((loading)=> {
      this.loading$ = loading
    })
    this.totalPageSubscription = this._store.pipe(select(selectInprogressTotalTask )).subscribe((total)=> {
      this.totalPage = Math.ceil(total as number / this.limit)
    })
  }

  ngOnInit(): void {
    const page = this.pageCount
    this._store.dispatch(getInprogressTask({page}))
  }

  getTime (time :string) {
    const currentDate = new Date(time);
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  taskDone(taskId : string) {
    this.taskDoneSubscription = this._userService.taskDone(taskId).subscribe(
      (data)=> {
        const page = this.pageCount
        this._store.dispatch(getInprogressTask({page}))
      },
      (err) => {
        if(err.status == 500) {
          localStorage.setItem('server-error' , 'server-error')
          this._router.navigate(['/server-error'])
        }
      }
    )
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

  ngOnDestroy(): void {
    this.taskSubscription?.unsubscribe()
    this.loadingSubscription?.unsubscribe()
    this.totalPageSubscription?.unsubscribe()
    this.taskDoneSubscription?.unsubscribe()
  }
}
