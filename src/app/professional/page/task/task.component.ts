import { Component, OnInit } from '@angular/core';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { CompleteTask } from '../../types/professional.types';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  tasks !: CompleteTask[]
  constructor(
    private readonly _professionalService : ProfessionalService
  ){}

  ngOnInit(): void {
      this._professionalService.getInProgressTask().subscribe(
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
