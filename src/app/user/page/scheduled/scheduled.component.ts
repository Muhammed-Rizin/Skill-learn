import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CompleteSchedule } from 'src/app/professional/types/professional.types';
import {
  selectInprogressScheduleData,
  selectInprogressScheduleLoading,
  selectInprogressTotalSchedule,
} from '../../store/user.selector';
import { getInprogressSchedule } from '../../store/user.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css'],
})
export class ScheduledComponent implements OnInit, OnDestroy {
  meetings!: CompleteSchedule[];
  loading$!: boolean;

  pageCount: number = 1;
  limit: number = 5;
  totalPage!: number;

  meetingSubscription: Subscription;
  loadingSubscription: Subscription;
  totalPageSubscription: Subscription;

  constructor(private readonly _store: Store) {
    this.meetingSubscription = this._store
      .pipe(select(selectInprogressScheduleData))
      .subscribe((meetings) => {
        this.meetings = meetings;
      });
    this.loadingSubscription = this._store
      .pipe(select(selectInprogressScheduleLoading))
      .subscribe((loading) => {
        this.loading$ = loading;
      });

    this.totalPageSubscription = this._store
      .pipe(select(selectInprogressTotalSchedule))
      .subscribe((total) => {
        this.totalPage = Math.ceil(total / this.limit);
      });
  }

  ngOnInit(): void {
    const page = this.pageCount;
    this._store.dispatch(getInprogressSchedule({ page }));
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
    this._store.dispatch(getInprogressSchedule({ page }));
  }

  prevPage() {
    this.pageCount--;
    const page = this.pageCount;
    this._store.dispatch(getInprogressSchedule({ page }));
  }

  ngOnDestroy(): void {
    this.meetingSubscription?.unsubscribe();
    this.loadingSubscription?.unsubscribe();
    this.totalPageSubscription?.unsubscribe();
  }
}
