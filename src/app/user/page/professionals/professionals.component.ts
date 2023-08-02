import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { userData } from '../../types/user.types';

@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.css']
})
export class ProfessionalsComponent implements OnInit{
  constructor(
    private userService : UserService
  ){}

  professionalData !: userData[]
  ngOnInit(): void {
    this.userService.getProfessionals().subscribe((data) => {
      this.professionalData = data
      console.log(data)
    })
  }
}
