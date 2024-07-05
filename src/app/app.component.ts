import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent, ToastService } from '@core';

@Component({
  selector: 'application-container',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private toaster = inject(ToastService);

  ngOnInit(): void {
    this.toaster.success('Application started successfully', {
      duration: 0
    });

    this.toaster.error('Application started successfully', {
      duration: 0
    });

    this.toaster.warning('Application started successfully', {
      duration: 0
    });

    this.toaster.info('Application started successfully', {
      duration: 0
    });
  }
}
