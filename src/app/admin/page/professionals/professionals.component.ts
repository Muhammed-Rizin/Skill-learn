import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectLoadingProfessionals, selectProfessional } from '../../store/admin.selector';
import { loadProfessionals, professionalBlocking, professionalunBlocking } from '../../store/admin.actions';

@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.css']
})
export class ProfessionalsComponent implements OnInit{
  professionals$ : any | null 
  loading$: any | null;

  constructor(
    private store : Store
  ){
    this.store.pipe(select(selectProfessional)).subscribe((professionals: any) => {
      this.professionals$ = professionals;
    });
    this.store.pipe(select(selectLoadingProfessionals)).subscribe((users: any) => {
      this.loading$ = users;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadProfessionals())
  }

  block(id : string){
    this.store.dispatch(professionalBlocking({id}))
  }

  unblock(id : string) {
    this.store.dispatch(professionalunBlocking({id}))
  }
}
