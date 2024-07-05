import { ChangeDetectionStrategy, Component, DestroyRef, effect, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { ToastService } from './toast.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { ClipboardService } from '@shared';
import { filter, shareReplay, tap } from 'rxjs';
import { Toast } from './toast';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoggerService } from '../../services';

@Component({
  selector: 'toast',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClipboardService]
})
export class ToastComponent implements OnInit {
  // injections
  toaster = inject(ToastService);
  clipboard = inject(ClipboardService);
  destroyRef = inject(DestroyRef);
  logger = inject(LoggerService);

  // state
  toasts: Toast[] = [];

  ngOnInit(): void {
    this.toaster.getAll()
      .pipe(
        filter((toasts) => toasts.length > 0),
        tap(toasts => {
          this.toasts = toasts;
          this.logger.log('ToastComponent', toasts);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  copy(message: string) {
    this.clipboard.copy(message)
      .pipe(
        tap({
          error: (error: Error) => {
            this.logger.error(error.message);
            this.toaster.error(error.message);
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
