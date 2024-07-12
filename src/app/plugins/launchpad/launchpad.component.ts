import { ChangeDetectionStrategy, Component } from '@angular/core';
import { App } from './app';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { LaunchpadService } from './launchpad.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'launchpad',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    AsyncPipe
  ],
  templateUrl: './launchpad.component.html',
  styleUrl: './launchpad.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LaunchpadService]
})
export class LaunchpadComponent {  
  protected apps: Observable<App[]> = this.launchpadService.getApps();

  constructor(
    private readonly launchpadService: LaunchpadService
  ) {}
}
