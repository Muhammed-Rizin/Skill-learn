import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  constructor(private router : Router, public dialog: MatDialog){}
  logOut(){
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        localStorage.removeItem('admin_jwt')
        this.router.navigate(['/admin'])
      } 
    });
  }
}


@Component({
  selector: 'dialog-animations-example-dialog',
  template : `
  <div class="custom-dialog">
    <h1 class="custom-dialog-title">Log Out</h1>
    <div class="custom-dialog-content">
      Would you like to log out?
    </div>
    <div class="custom-dialog-actions">
      <button class="custom-dialog-button" (click)="onCancelClick()">No</button>
      <button class="custom-dialog-button" (click)="onOkClick()" cdkFocusInitial>Yes</button>
    </div>
  </div>
  `,
  styleUrls: ['./side-bar.component.css']
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}

  onCancelClick(){
    this.dialogRef.close(false);
  }

  onOkClick(){
    this.dialogRef.close(true);
  }
}
