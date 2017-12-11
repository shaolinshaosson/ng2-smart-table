import { Directive, ElementRef, EventEmitter, OnChanges, OnInit, Output } from "@angular/core";

@Directive({
    selector: '[p46ClearInput]',
    exportAs: 'p46ClearInput',
})

export class ClearInputDirective implements OnInit, OnChanges {

    @Output() clear = new EventEmitter();

    constructor(private el: ElementRef) {
    }

    ngOnChanges() {
    }

    ngOnInit() {

        //console.error('clear input directive  ngOnInit');
        let me = this.el.nativeElement as HTMLInputElement;
        if (me.nodeName.toUpperCase() !== 'INPUT') {
            throw new Error('Invalid input type for clearableInput:' + me);
        }
        let wrapper = document.createElement('span') as HTMLSpanElement;
        wrapper.className = 'table-clear-input';

        let searchIcon = document.createElement('i') as HTMLElement;
        // // calls the clearvalue function
        searchIcon.addEventListener('click', () => this.clearValue());
        searchIcon.className = 'fa fa-times fa-1x text-muted';

        wrapper.appendChild(searchIcon);

        me.insertAdjacentElement('afterend', wrapper);
    }

    clearValue() {
        this.clear.emit(true);
    }
}