import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { professionalData } from '../../types/professional.types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy{
  approved : boolean = false

  approvedSubscription !: Subscription

  constructor(
    private router : Router, 
    readonly professioanlService : ProfessionalService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.approvedSubscription = this.professioanlService.isApproved().subscribe((data) => {
      this.approved = !data
    }, 
    (err) => {
      if(err.status == 500) {
        localStorage.setItem('server-error' , 'server-error')
        this.router.navigate(['/professional/server-error'])
      }
    })

  }

  ngOnDestroy(): void {
    this.approvedSubscription.unsubscribe()
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