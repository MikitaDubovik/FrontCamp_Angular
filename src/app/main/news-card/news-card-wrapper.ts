import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[app-news-card]',
})
export class NewsCardWrapper {
    constructor(public viewContainerRef: ViewContainerRef) { }
}