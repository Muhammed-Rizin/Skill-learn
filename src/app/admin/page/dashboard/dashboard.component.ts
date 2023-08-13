import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadTotalProfessionals, loadTotalRequestProfessionals, loadTotalUsers } from '../../store/admin.actions';
import { selectLoadingTotalUsers, selectTotalProfessional, selectTotalRequestProfessional, selectTotalUsers } from '../../store/admin.selector';
import { Professional, User } from '../../types/admin.types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  users$ !: User[] | null 
  professionals$!: Professional[] | null 
  requestProfessionals$!: Professional[] | null
  loading$!: boolean
  
  constructor(
    private store : Store
  ){
    this.store.pipe(select(selectTotalUsers)).subscribe((users) => {
      this.users$ = users as User[];
    });

    this.store.pipe(select(selectTotalProfessional)).subscribe((professionals) => {
      this.professionals$ = professionals as Professional[];
    });
    this.store.pipe(select(selectTotalRequestProfessional)).subscribe((professionals) => {
      this.requestProfessionals$ = professionals as Professional[];
    });
    this.store.pipe(select(selectLoadingTotalUsers)).subscribe((loading) => {
      this.loading$ = loading 
    });
  }

  
  ngOnInit(): void {
    this.store.dispatch(loadTotalUsers())
    this.store.dispatch(loadTotalProfessionals())
    this.store.dispatch(loadTotalRequestProfessionals())
  }
}
