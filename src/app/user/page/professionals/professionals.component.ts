import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { professionalData } from 'src/app/professional/types/professional.types';
import { getProfessionals } from '../../store/user.action';
import { selectProfessionalsData, selectProfessionalsLoading } from '../../store/user.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.css']
})
export class ProfessionalsComponent implements OnInit, OnDestroy{

  professionals$!: professionalData[]
  totalProfessionals$ !: professionalData[]

  loading$!: boolean
  searchValue : string = ''

  pageCount : number = 1
  limit : number = 5
  totalPage !: number 
  skip : number = (this.pageCount - 1) * this.limit
  endIndex : number = this.skip + this.limit

  professionalSubscription : Subscription
  loadingSubscription : Subscription

  constructor(
    private _store : Store
  ){
    this.professionalSubscription = this._store.pipe(select(selectProfessionalsData)).subscribe((professionals: professionalData[]) => {
      this.totalProfessionals$ = professionals
      this.totalPage = Math.ceil(professionals?.length / this.limit)
      this.currentProfessionals()
    });
    this.loadingSubscription = this._store.pipe(select(selectProfessionalsLoading)).subscribe((loading: boolean) => {
      this.loading$ = loading
    });
  }
  ngOnInit(): void {
    this._store.dispatch(getProfessionals())
  }

  nextPage() {
    this.pageCount ++ 
    this.skip = (this.pageCount - 1) * this.limit
    this.currentProfessionals()

  }

  prevPage(){
    this.pageCount --
    this.skip = (this.pageCount - 1) * this.limit
    this.currentProfessionals()

  }

  currentProfessionals() {
    this.endIndex = this.skip + this.limit
    this.professionals$ = this.totalProfessionals$.slice(this.skip, this.endIndex)
  }

  ngOnDestroy(): void {
    this.professionalSubscription?.unsubscribe()
    this.loadingSubscription?.unsubscribe()
  }
}
