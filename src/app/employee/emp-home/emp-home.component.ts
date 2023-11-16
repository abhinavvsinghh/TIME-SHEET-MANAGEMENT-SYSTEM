import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-home',
  templateUrl: './emp-home.component.html',
  styleUrls: ['./emp-home.component.css']
})
export class EmpHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // back
  back() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
