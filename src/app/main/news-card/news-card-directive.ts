import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appNewsCard]',
})
export class NewsCardDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
