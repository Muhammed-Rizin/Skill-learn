import { Component, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectLoadingRequestProfessionals, selectLoadingTotalRequestProfessionals, selectRequestProfessional, selectTotalRequestProfessional } from '../../store/admin.selector';
import { approveProfessionals, loadRequestProfessionals, loadTotalRequestProfessionals, rejectProfessionals } from '../../store/admin.actions';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-professional-requests',
  templateUrl: './professional-requests.component.html',
  styleUrls: ['./professional-requests.component.css']
})
export class ProfessionalRequestsComponent {
  professionals$ : any | null 
  loading$: any;
  professioanlLength$ : any | null
  professionalsLoading$ : any | null
  page : number = 1
  limit : number = 5

  constructor(
    private store : Store,
    public dialog: MatDialog
  ){
    this.store.pipe(select(selectRequestProfessional)).subscribe((professionals: any) => {
      this.professionals$ = professionals;
    });
    this.store.pipe(select(selectLoadingTotalRequestProfessionals)).subscribe((users: any) => {
      this.loading$ = users;
    });
    this.store.pipe(select(selectTotalRequestProfessional)).subscribe((users: any) => {
      this.professioanlLength$ = users?.length;
    });

    this.store.pipe(select(selectLoadingRequestProfessionals)).subscribe((users: any) => {
      this.professionalsLoading$ = users;
    });
  }

  getLength() {
    return Object.keys(this.professionals$).length
  }

  ngOnInit(): void {
    this.store.dispatch(loadRequestProfessionals({page : 1, limit : 5}))
    this.store.dispatch(loadTotalRequestProfessionals())
  }

  approve(id : string, name : string){
    const dialogRef = this.dialog.open(approveDialog, {
      width: '350px',
      data : {userName : name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.store.dispatch(approveProfessionals({id}))
      }
    });
  }

  reject(id : string, name : string) {
    const dialogRef = this.dialog.open(rejectDialog, {
      width: '350px',
      data : {userName : name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.store.dispatch(rejectProfessionals({id}))
      }
    });
  }

  pageChange(event: PageEvent) {
    const page = event.pageIndex + 1
    const limit = event.pageSize;
    const totallength = event.length;

    this.page = page
    this.limit = limit
    this.store.dispatch(loadRequestProfessionals({page, limit}))
  }
}



@Component({
  selector: 'dialog-animations-example-dialog',
  template : `
  <div class="custom-dialog">
    <h1 class="custom-dialog-title">Reject professional</h1>
    <div class="custom-dialog-content">
      Would you like to reject "{{data.userName}}"?
    </div>
    <div class="custom-dialog-actions">
      <button class="custom-dialog-button" (click)="onCancelClick()">No</button>
      <button class="custom-dialog-button" (click)="onOkClick()" cdkFocusInitial>Yes</button>
    </div>
  </div>
  `,
  styleUrls: ['./professional-requests.component.css']
})
export class rejectDialog {
  constructor(public dialogRef: MatDialogRef<rejectDialog>,  @Inject(MAT_DIALOG_DATA) public data: { userName: string }) {}

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
    <h1 class="custom-dialog-title">Approve professional</h1>
    <div class="custom-dialog-content">
      Would you like to approve "{{data.userName}}"?
    </div>
    <div class="custom-dialog-actions">
      <button class="custom-dialog-button" (click)="onCancelClick()">No</button>
      <button class="custom-dialog-button" (click)="onOkClick()" cdkFocusInitial>Yes</button>
    </div>
  </div>
  `,
  styleUrls: ['./professional-requests.component.css']
})
export class approveDialog {
  constructor(public dialogRef: MatDialogRef<approveDialog>, @Inject(MAT_DIALOG_DATA) public data: { userName: string }) {}

  onCancelClick(){
    this.dialogRef.close(false);
  }

  onOkClick(){
    this.dialogRef.close(true);
  }
}