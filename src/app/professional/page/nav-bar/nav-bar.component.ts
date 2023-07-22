import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfessionalService } from 'src/app/services/professional/professional.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(
    private router : Router, 
    readonly professioanlService : ProfessionalService,
    public dialog: MatDialog
  ) {
  }
  logOut(){
    const dialogRef = this.dialog.open(logoutdialog, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        localStorage.removeItem('professional_token')
        this.router.navigate(['/professional/login'])
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
  styleUrls: ['./nav-bar.component.css']
})
export class logoutdialog {
  constructor(public dialogRef: MatDialogRef<logoutdialog>) {}

  onCancelClick(){
    this.dialogRef.close(false);
  }

  onOkClick(){
    this.dialogRef.close(true);
  }
}