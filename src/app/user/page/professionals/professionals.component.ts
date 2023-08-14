import { Component, OnInit } from '@angular/core';
import { professionalData } from 'src/app/professional/types/professional.types';
import { Store, select } from '@ngrx/store';
import { getProfessionals } from '../../store/user.action';
import { selectProfessionalsData, selectProfessionalsLoading, selectProfessionalsTotal } from '../../store/user.selector';

@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.css']
})
export class ProfessionalsComponent implements OnInit{

  professionals$!: professionalData[]
  loading$!: boolean
  searchValue : string = ''

  pageCount : number = 1
  limit : number = 5
  totalPage !: number 

  constructor(
    private _store : Store
  ){
    this._store.pipe(select(selectProfessionalsData)).subscribe((professionals: professionalData[]) => {
      this.professionals$ = professionals
    });
    this._store.pipe(select(selectProfessionalsTotal)).subscribe((total) => {
      this.totalPage = Math.ceil(total as number / this.limit)
    })
    this._store.pipe(select(selectProfessionalsLoading)).subscribe((loading: boolean) => {
      this.loading$ = loading
    });
  }
  ngOnInit(): void {
    const page = this.pageCount
    this._store.dispatch(getProfessionals({page}))
  }

  nextPage() {
    this.pageCount ++ 
    const page = this.pageCount
    this._store.dispatch(getProfessionals({page}))
  }

  prevPage(){
    this.pageCount --
    const page = this.pageCount
    this._store.dispatch(getProfessionals({page}))
  }
}
