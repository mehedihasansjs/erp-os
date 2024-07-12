import { Directive, Input, OnInit } from "@angular/core";
import { Theme } from "./theme.enum";
import { ThemeService } from "./theme.service";

@Directive({
    selector: '[theme-controller]',
    standalone: true
})
export class ThemeDirective implements OnInit {
    constructor(
        private readonly themeService: ThemeService
    ) {}

    ngOnInit(): void {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', e => {
            const newColorScheme = e.matches ? Theme.Dark : Theme.Light;
            this.themeService.setTheme(newColorScheme);
        });
    }
}
