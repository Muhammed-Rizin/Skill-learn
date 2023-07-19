import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectLoadingUsers, selectUsers } from '../../store/admin.selector';
import { loadUsers, userBlocking, userunBlocking } from '../../store/admin.actions';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users$ : any | null 
  loading$ : any | null

  constructor(
    private store : Store,
    private adminService : AdminService
  ){
    this.store.pipe(select(selectUsers)).subscribe((users: any) => {
      this.users$ = users;
    });
    this.store.pipe(select(selectLoadingUsers)).subscribe((users: any) => {
      this.loading$ = users;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers())
  }

  unblock(id : string){
    this.store.dispatch(userunBlocking({id}))
  }

  block(id : string){
    this.store.dispatch(userBlocking({id}))
  }
}
