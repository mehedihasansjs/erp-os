import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent, ToastService } from '@core';
import { Layout1Component } from '@layouts';

@Component({
  selector: 'application-container',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastComponent,
    Layout1Component
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
