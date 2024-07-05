import { Injectable, Signal, signal } from '@angular/core';
import { Toast } from './toast';
import { ToastType } from './toast-type';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ToastService {
  private toasts$ = new BehaviorSubject<Toast[]>([]);

  getAll(): Observable<Toast[]> {
    return this.toasts$.asObservable();
  }

  private add(toast: Toast): void {
    if (toast.duration === 0) {
      toast.autoClose = false;
    }

    const newToast = new Toast(toast.message, toast.type, toast);
    const toasts = this.toasts$.getValue();
    toasts.push(newToast);
    this.toasts$.next(toasts);
  }

  private schedule(toast: Toast): void {
    this.add(toast);
    if (toast.autoClose) {
      setTimeout(() => {
        this.remove(toast.id!);
      }, toast.duration);
    }
  }

  remove(id: string): void {
    const toasts = this.toasts$.getValue();
    const index = toasts.findIndex((toast) => toast.id === id);
    if (index > -1) {
      toasts.splice(index, 1);
      this.toasts$.next(toasts);
    }
  }

  clear(): void {
    this.toasts$.next([]);
  }

  success(message: string, config?: Partial<Toast>): void {
    config = { ...config, icon: 'check-circle' };
    this.schedule(new Toast(message, ToastType.Success, config));
  }

  error(message: string, config?: Partial<Toast>): void {
    config = { ...config, icon: 'times-circle' };
    this.schedule(new Toast(message, ToastType.Error, config));
  }

  info(message: string, config?: Partial<Toast>): void {
    config = { ...config, icon: 'circle-exclamation' };
    this.schedule(new Toast(message, ToastType.Info, config));
  }

  warning(message: string, config?: Partial<Toast>): void {
    config = { ...config, icon: 'triangle-exclamation' };
    this.schedule(new Toast(message, ToastType.Warning, config));
  }
}
