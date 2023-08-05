import { Component, OnInit } from '@angular/core';
import { professionalData } from 'src/app/professional/types/professional.types';
import { Store, select } from '@ngrx/store';
import { getProfessionals } from '../../store/user.action';
import { selectProfessionalsData, selectProfessionalsLoading } from '../../store/user.selector';

@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.css']
})
export class ProfessionalsComponent implements OnInit{

  professionals$!: professionalData[]
  loading$!: boolean
  searchValue : string = ''

  constructor(
    private _store : Store
  ){
    this._store.pipe(select(selectProfessionalsData)).subscribe((professionals: professionalData[]) => {
      this.professionals$ = professionals
    });
    this._store.pipe(select(selectProfessionalsLoading)).subscribe((loading: boolean) => {
      console.log(loading)
      this.loading$ = loading
    });
  }
  ngOnInit(): void {
    this._store.dispatch(getProfessionals())
  }
}
