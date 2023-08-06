import { Component, OnInit } from '@angular/core';
import { CompleteSchedule } from 'src/app/professional/types/professional.types';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css']
})
export class ScheduledComponent implements OnInit{
  tasks !: CompleteSchedule[]
  constructor(
    private readonly _userService : UserService
  ){}

  ngOnInit(): void {
      this._userService.getInProgressMeeting().subscribe(
        (data) => {this.tasks = data}
      )
  }

  getTime (time :string) {
    const currentDate  = new Date(time)
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    return `${hours}:${minutes}`
  }
}
