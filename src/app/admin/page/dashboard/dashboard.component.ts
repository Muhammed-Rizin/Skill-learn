import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadProfessionals, loadRequestProfessionals, loadUsers } from '../../store/admin.actions';
import { selectLoadingUsers, selectProfessional, selectRequestProfessional, selectUsers } from '../../store/admin.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(
    private store : Store
  ){
    this.store.pipe(select(selectUsers)).subscribe((users: any) => {
      this.users$ = users;
    });

    this.store.pipe(select(selectProfessional)).subscribe((professionals: any) => {
      this.professionals$ = professionals;
    });
    this.store.pipe(select(selectRequestProfessional)).subscribe((professionals: any) => {
      this.requestProfessionals$ = professionals;
    });
    this.store.pipe(select(selectLoadingUsers)).subscribe((professionals: any) => {
      this.loading$ = professionals;
    });
  }
  users$ : any | null 
  professionals$ : any | null 
  requestProfessionals$ : any | null
  loading$ = this.store.select(selectLoadingUsers)
  
  ngOnInit(): void {
    this.store.dispatch(loadUsers())
    this.store.dispatch(loadProfessionals())
    this.store.dispatch(loadRequestProfessionals())
  }
}
