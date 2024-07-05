import { ToastType } from "./toast-type";

export class Toast {
    id: string = Math.random().toString(36).substr(2, 9);
    type!: ToastType;
    message!: string;
    icon?: string;
    duration?: number = 5000;
    autoClose?: boolean = true;
    createdAt?: number = Date.now();

    constructor(message: string, type: ToastType, config?: Partial<Toast>) {
        this.message = message;
        this.type = type;

        if (config) {
            Object.assign(this, config);
        }
    }
}
