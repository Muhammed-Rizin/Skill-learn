import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectLoadingRequestProfessionals, selectRequestProfessional } from '../../store/admin.selector';
import { approveProfessionals, loadRequestProfessionals, rejectProfessionals } from '../../store/admin.actions';

@Component({
  selector: 'app-professional-requests',
  templateUrl: './professional-requests.component.html',
  styleUrls: ['./professional-requests.component.css']
})
export class ProfessionalRequestsComponent {
  professionals$ : any | null 
  loading$: any;

  constructor(
    private store : Store
  ){
    this.store.pipe(select(selectRequestProfessional)).subscribe((professionals: any) => {
      this.professionals$ = professionals;
    });
    this.store.pipe(select(selectLoadingRequestProfessionals)).subscribe((users: any) => {
      this.loading$ = users;
    });
  }

  getLength() {
    return Object.keys(this.professionals$).length
  }

  ngOnInit(): void {
    this.store.dispatch(loadRequestProfessionals())
  }

  approve(id : string){
    this.store.dispatch(approveProfessionals({id}))
  }

  reject(id : string) {
    this.store.dispatch(rejectProfessionals({id}))
  }
}
