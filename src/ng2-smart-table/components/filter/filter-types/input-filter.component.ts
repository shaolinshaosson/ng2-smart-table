import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';

import { DefaultFilter } from './default-filter';

@Component({
    selector: 'input-filter',
    template: `
        <input [(ngModel)]="query"
               [ngClass]="inputClass"
               [formControl]="inputControl"
               class="form-control"
               type="text"
               placeholder="{{ column.title }}" p46ClearInput (clear)="resetFilter('')"/>
    `,
})
export class InputFilterComponent extends DefaultFilter implements OnInit {

    inputControl = new FormControl();

    constructor() {
        super();
    }

    ngOnInit() {
        this.inputControl.valueChanges
            //.skip(1)
            .distinctUntilChanged()
            .debounceTime(this.delay)
            .subscribe((value: string) => this.setFilter());
    }

    resetFilter(event: any) {
        this.inputControl.setValue('', {emitEvent: true});
    }
}
