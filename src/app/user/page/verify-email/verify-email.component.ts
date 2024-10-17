import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(
    private userService: UserService,
    private _router: Router,
    private route: ActivatedRoute,
  ) {}

  token!: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
    const token = this.token;
    if (this.token.length === 0) {
      this._router.navigate(['/']);
    } else {
      this.userService.verifyEmail(token).subscribe(
        () => {},
        (err) => {
          if (err.status == 500) {
            localStorage.setItem('server-error', 'server-error');
            this._router.navigate(['/server-error']);
          }
        },
      );
    }
  }
}
