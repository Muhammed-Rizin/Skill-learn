import { Component, OnInit } from '@angular/core';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { CompleteTask } from '../../types/professional.types';

@Component({
  selector: 'app-task-completed',
  templateUrl: './task-completed.component.html',
  styleUrls: ['./task-completed.component.css']
})
export class TaskCompletedComponent implements OnInit{
  tasks !: CompleteTask[]
  constructor(
    private readonly _professionalService : ProfessionalService
  ){}

  ngOnInit(): void {
      this._professionalService.getCompletedTask().subscribe(
        (data) => this.tasks = data
      )
  }

  getTime (time :string) {
    const currentDate  = new Date(time)
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    return `${hours}:${minutes}`
  }
}
