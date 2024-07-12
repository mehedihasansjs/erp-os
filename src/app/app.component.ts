import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FONTAWESOME_VERSION } from '@core';
import { Layout1Component } from '@layouts';
import { IconService, ThemeDirective } from '@plugins';

@Component({
  selector: 'application-container',
  standalone: true,
  imports: [
    RouterOutlet,
    Layout1Component,
    ThemeDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private readonly iconService: IconService
  ) {}

  ngOnInit(): void {
    this.iconService.setVersion(FONTAWESOME_VERSION);
  }
}
