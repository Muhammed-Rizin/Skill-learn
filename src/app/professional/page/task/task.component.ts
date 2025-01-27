import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { CompleteTask } from '../../types/professional.types';
import {
  selectInprogressTaskData,
  selectInprogressTaskLoading,
  selectInprogressTotalTask,
} from '../../store/professional.selector';
import { getInprogressTask } from '../../store/professional.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  tasks!: CompleteTask[];
  loading$: boolean = true;

  pageCount: number = 1;
  limit: number = 5;
  totalPage!: number;

  taskSubscription: Subscription;
  loadingSubscription: Subscription;
  totalSubscription: Subscription;

  constructor(private readonly _store: Store) {
    this.taskSubscription = this._store
      .pipe(select(selectInprogressTaskData))
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
    this.loadingSubscription = this._store
      .pipe(select(selectInprogressTaskLoading))
      .subscribe((loading) => {
        this.loading$ = loading;
      });
    this.totalSubscription = this._store
      .pipe(select(selectInprogressTotalTask))
      .subscribe((total) => {
        this.totalPage = Math.ceil(total / this.limit);
      });
  }

  ngOnInit(): void {
    const page = this.pageCount;
    this._store.dispatch(getInprogressTask({ page }));
  }

  ngOnDestroy(): void {
    this.taskSubscription?.unsubscribe();
    this.loadingSubscription?.unsubscribe();
    this.totalSubscription?.unsubscribe();
  }

  getTime(time: string) {
    const currentDate = new Date(time);
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  nextPage() {
    this.pageCount++;
    const page = this.pageCount;
    this._store.dispatch(getInprogressTask({ page }));
  }

  prevPage() {
    this.pageCount--;
    const page = this.pageCount;
    this._store.dispatch(getInprogressTask({ page }));
  }
}
