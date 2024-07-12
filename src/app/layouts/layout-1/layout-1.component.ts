import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LaunchpadComponent } from '@plugins';

@Component({
  selector: 'layout-1',
  standalone: true,
  imports: [
    LaunchpadComponent
  ],
  templateUrl: './layout-1.component.html',
  styleUrl: './layout-1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Layout1Component {

}
