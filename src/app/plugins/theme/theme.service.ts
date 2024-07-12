import { Injectable } from "@angular/core";
import { Theme } from "./theme.enum";
import { LoggerService } from "@core";

@Injectable()
export class ThemeService {
    private element: HTMLElement = document.body;

    constructor(
        private readonly logger: LoggerService
    ) {
        this.setTheme(this.getTheme());
    }

    setTheme(theme: Theme) {
        this.clear();
        this.element.classList.add(theme);
        this.logger.log(`Theme set to`, theme);
    }

    getTheme(): Theme {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return Theme.Dark;
        } else {
            return Theme.Light;
        }
    }

    clear() {
        const themes = Object.values(Theme);

        themes.forEach(theme => {
            document.body.classList.remove(theme);
        });
    }
}
