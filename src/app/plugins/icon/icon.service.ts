import { Injectable } from "@angular/core";
import { LoggerService } from "@core";

@Injectable()
export class IconService {
    constructor(
        private readonly logger: LoggerService
    ) {}

    setVersion(version: string) {
        const links: HTMLLinkElement[] = Array.from(document.head.getElementsByTagName('link'));
        const fontawesomeLinkElement = links.find(link => link.id === 'fontawesome');

        if (fontawesomeLinkElement) {
            fontawesomeLinkElement.href = fontawesomeLinkElement.href.replace('[VERSION]', version);
            this.logger.log(`Font Awesome version set to`, version);
        } else {
            throw new Error('Font Awesome link element not found');
        }
    }
}
