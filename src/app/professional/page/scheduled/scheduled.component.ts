import { Component, OnInit } from '@angular/core';
import { CompleteSchedule } from '../../types/professional.types';
import { ProfessionalService } from 'src/app/services/professional/professional.service';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css']
})
export class ScheduledComponent implements OnInit {
  tasks !: CompleteSchedule[]
  constructor(
    private readonly _professionalService : ProfessionalService
  ){}

  ngOnInit(): void {
      this._professionalService.getInProgressMeeting().subscribe(
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
