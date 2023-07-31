import { Component, Inject, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectLoadingProfessionals, selectLoadingTotalProfessionals, selectProfessional, selectTotalProfessional } from '../../store/admin.selector';
import { loadProfessionals, loadTotalProfessionals, professionalBlocking, professionalunBlocking } from '../../store/admin.actions';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.css']
})
export class ProfessionalsComponent implements OnInit{
  professionals$ : any | null 
  loading$: any | null;
  professioanlLength$ : any | null
  professionalsLoading$ : any | null
  page : number 
  limit : number 

  constructor(
    private store : Store,
    public dialog: MatDialog
  ){
    this.store.pipe(select(selectProfessional)).subscribe((professionals: any) => {
      this.professionals$ = professionals;
    });
    this.store.pipe(select(selectLoadingTotalProfessionals)).subscribe((users: any) => {
      this.loading$ = users;
    });

    this.store.pipe(select(selectTotalProfessional)).subscribe((users: any) => {
      this.professioanlLength$ = users?.length;
    });

    this.store.pipe(select(selectLoadingProfessionals)).subscribe((users: any) => {
      this.professionalsLoading$ = users;
    });
    this.page = 1
    this.limit = 5
  }

  ngOnInit(): void {
    this.store.dispatch(loadProfessionals({page : 1, limit : 5}))
    this.store.dispatch(loadTotalProfessionals())
  }

  block(id : string, name : string){
    const dialogRef = this.dialog.open(blockDialog, {
      width: '350px',
      data : {userName : name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.store.dispatch(professionalBlocking({id}))
      }
    });
  }

  unblock(id : string, name : string) {
    const dialogRef = this.dialog.open(unblockDialog, {
      width: '350px',
      data : {userName : name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.store.dispatch(professionalunBlocking({id}))
      }
    });
  }

  pageChange(event: PageEvent) {
    const page = event.pageIndex + 1
    const limit = event.pageSize;
    const totallength = event.length;

    this.page = page
    this.limit = limit

    this.store.dispatch(loadProfessionals({page, limit}))
  }
}


@Component({
  selector: 'dialog-animations-example-dialog',
  template : `
  <div class="custom-dialog">
    <h1 class="custom-dialog-title">Block professional</h1>
    <div class="custom-dialog-content">
      Would you like to block  "{{data.userName}}"?
    </div>
    <div class="custom-dialog-actions">
      <button class="custom-dialog-button" (click)="onCancelClick()">No</button>
      <button class="custom-dialog-button" (click)="onOkClick()" cdkFocusInitial>Yes</button>
    </div>
  </div>
  `,
  styleUrls: ['./professionals.component.css']
})
export class blockDialog {
  constructor(public dialogRef: MatDialogRef<blockDialog>,  @Inject(MAT_DIALOG_DATA) public data: { userName: string }) {}

  onCancelClick(){
    this.dialogRef.close(false);
  }

  onOkClick(){
    this.dialogRef.close(true);
  }
}


@Component({
  selector: 'dialog-animations-example-dialog',
  template : `
  <div class="custom-dialog">
    <h1 class="custom-dialog-title">Unblock professional</h1>
    <div class="custom-dialog-content">
      Would you like to unblock "{{data.userName}}"?
    </div>
    <div class="custom-dialog-actions">
      <button class="custom-dialog-button" (click)="onCancelClick()">No</button>
      <button class="custom-dialog-button" (click)="onOkClick()" cdkFocusInitial>Yes</button>
    </div>
  </div>
  `,
  styleUrls: ['./professionals.component.css']
})
export class unblockDialog {
  constructor(public dialogRef: MatDialogRef<unblockDialog>, @Inject(MAT_DIALOG_DATA) public data: { userName: string }) {}

  onCancelClick(){
    this.dialogRef.close(false);
  }

  onOkClick(){
    this.dialogRef.close(true);
  }
}