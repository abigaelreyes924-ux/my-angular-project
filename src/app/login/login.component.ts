import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap'; 

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  login() {
    const successModalEl = document.getElementById('successModal');
    const failedModalEl = document.getElementById('failedModal');

    if (this.username === 'admin' && this.password === 'admin') {
      const successModal = new bootstrap.Modal(successModalEl!);
      successModal.show();

      setTimeout(() => {
        successModal.hide();
        this.router.navigate(['/admin'], { relativeTo: this.activatedRoute })
      }, 2000);
    } else {
      const failedModal = new bootstrap.Modal(failedModalEl!);
      failedModal.show();

      // Optional: auto close failed modal after 2 seconds
      setTimeout(() => {
        failedModal.hide();
      }, 2000);
    }
  }
}
