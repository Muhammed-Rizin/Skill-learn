import { Component, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { selectLoadingTotalUsers, selectLoadingUsers, selectTotalUsers, selectUsers } from '../../store/admin.selector';
import { loadTotalUsers, loadUsers, userBlocking, userunBlocking } from '../../store/admin.actions';
import { PageEvent } from '@angular/material/paginator';
import { User } from '../../types/admin.types';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users$ !: User[] 
  loading$ !: boolean
  page : number 
  limit : number 
  
  constructor(
    private store : Store,
    public dialog: MatDialog
  ){
    this.store.pipe(select(selectUsers)).subscribe((users) => {
      this.users$ = users as User[];
    });
    this.store.pipe(select(selectLoadingTotalUsers)).subscribe((loading) => {
      this.loading$ = loading;
    });
    
    this.page = 1
    this.limit = 5
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers({page : 1, limit : 5}))
    this.store.dispatch(loadTotalUsers())
  }

  unblock(id : string, name : string){
    const dialogRef = this.dialog.open(unblockDialog, {
      width: '350px',
      data : {userName : name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.store.dispatch(userunBlocking({id}))
      }
    });
  }

  block(id : string, name : string){
    const dialogRef = this.dialog.open(blockDialog, {
      width: '350px',
      data : {userName : name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.store.dispatch(userBlocking({id}))
      }
    });
  }

  pageChange(event: PageEvent) {
    const page = event.pageIndex + 1
    const limit = event.pageSize;
    const totallength = event.length;

    this.store.dispatch(loadUsers({page, limit}))
  }
}



@Component({
  selector: 'dialog-animations-example-dialog',
  template : `
  <div class="custom-dialog">
    <h1 class="custom-dialog-title">Block User</h1>
    <div class="custom-dialog-content">
      Would you like to block  "{{data.userName}}"?
    </div>
    <div class="custom-dialog-actions">
      <button class="custom-dialog-button" (click)="onCancelClick()">No</button>
      <button class="custom-dialog-button" (click)="onOkClick()" cdkFocusInitial>Yes</button>
    </div>
  </div>
  `,
  styleUrls: ['./users.component.css']
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
    <h1 class="custom-dialog-title">Unblock User</h1>
    <div class="custom-dialog-content">
      Would you like to unblock "{{data.userName}}"?
    </div>
    <div class="custom-dialog-actions">
      <button class="custom-dialog-button" (click)="onCancelClick()">No</button>
      <button class="custom-dialog-button" (click)="onOkClick()" cdkFocusInitial>Yes</button>
    </div>
  </div>
  `,
  styleUrls: ['./users.component.css']
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