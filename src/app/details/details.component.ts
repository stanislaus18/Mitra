import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomEvent } from '../classes/custom-event';
import { CustomElement } from '../classes/custom-element';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    @Output() event = new EventEmitter();
    @Input() seldata: CustomElement;

    /* 
        Created Custom Event to use CRUD 
        Used on details.component.html
    */
    edit = new CustomEvent({ n: 'EDIT' });
    delete = new CustomEvent({ n: 'DELETE' });

    constructor() { }

    ngOnInit() { 
        this.edit.data = this.seldata;
        this.delete.data = this.seldata;
    }

    triggerevent(event: any) {        
        this.event.emit(event);
    }
}
