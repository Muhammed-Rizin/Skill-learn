import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  mentor: boolean = false;
  user!: boolean;

  ngOnInit(): void {
    this.user = localStorage.getItem('userJwt') ? true : false;
  }
  toMentor() {
    this.mentor = true;
  }
  toMentee() {
    this.mentor = false;
  }
}
