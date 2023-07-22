import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadTotalProfessionals, loadTotalRequestProfessionals, loadTotalUsers } from '../../store/admin.actions';
import { selectLoadingTotalUsers, selectTotalProfessional, selectTotalRequestProfessional, selectTotalUsers } from '../../store/admin.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(
    private store : Store
  ){
    this.store.pipe(select(selectTotalUsers)).subscribe((users: any) => {
      this.users$ = users;
    });

    this.store.pipe(select(selectTotalProfessional)).subscribe((professionals: any) => {
      this.professionals$ = professionals;
    });
    this.store.pipe(select(selectTotalRequestProfessional)).subscribe((professionals: any) => {
      this.requestProfessionals$ = professionals;
    });
    this.store.pipe(select(selectLoadingTotalUsers)).subscribe((professionals: any) => {
      this.loading$ = professionals;
    });
  }
  users$ : any | null 
  professionals$ : any | null 
  requestProfessionals$ : any | null
  loading$ = this.store.select(selectLoadingTotalUsers)
  
  ngOnInit(): void {
    this.store.dispatch(loadTotalUsers())
    this.store.dispatch(loadTotalProfessionals())
    this.store.dispatch(loadTotalRequestProfessionals())
  }
}
