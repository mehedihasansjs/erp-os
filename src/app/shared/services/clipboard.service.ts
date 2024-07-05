import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";

@Injectable()
export class ClipboardService {
    copy(text: string): Observable<void> {
        let copied = navigator.clipboard.writeText(text);
        return from(copied);
    }
}
