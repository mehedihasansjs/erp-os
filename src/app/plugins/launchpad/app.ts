export class App {
    id?: string;
    name?: string;
    description?: string;
    icon?: string;
    url?: string;

    constructor(data: Partial<App>) {
        Object.assign(this, data);
    }

    getIconClass() {
        return `fa-solid fa-${this.icon}`;
    }
}
