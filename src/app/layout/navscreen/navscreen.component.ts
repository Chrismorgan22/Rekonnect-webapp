import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navscreen',
  templateUrl: './navscreen.component.html',
  styleUrls: ['./navscreen.component.scss'],
})
export class NavscreenComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  candidate() {
    this.router.navigate(['/candidate-list']);
  }
  applicant() {
    this.router.navigate(['/applicant-list']);
  }
  bgvApplicant() {
    this.router.navigate(['/bgvapplicant-list']);
  }
}
