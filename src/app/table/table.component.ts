import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomEvent } from './../classes/custom-event';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    @Output() event = new EventEmitter();

    add = new CustomEvent({ n: 'ADD' });
    details = new CustomEvent({ n: 'DETAILS' });
    copyelements: any;

    elements = [
        {
            title: 'Element Title',
            description: 'Element Description'
        }
    ];

    constructor() {
        // used when the element is empty
        this.copyelements = Array.from(this.elements);
    }

    ngOnInit() { }

    addElement(element) {
        //TODO: Add element here  
        
        // Removing the first element considering it as information to users
        if (this.elements[0].title === 'Element Title') {
            this.elements.pop();
        }

        this.elements.push(element);
    }

    updateElement(element) {
        //TODO: Update element here
        this.elements.forEach((e: any) => {
            if (e.dataId === element.dataId) {
                e.title = element.title;
                e.description = element.description;
            }
        });
    }

    deleteElement(element) {
        //TODO: Delete element here
        if (confirm('Are you sure you want to delete element?')) {
            let delIndex = this.elements.findIndex((e: any) => e.dataId === element.dataId);
            this.elements.splice(delIndex, 1);
        }

        // adding the details to table when its empty
        if (this.elements.length === 0) {
            this.elements = Array.from(this.copyelements);
        }
    }

    triggerevent(event: any, selElem?: any) {
        switch (event.name) {
            case 'CREATE':
                this.addElement(event.data);
                break;
            case 'UPDATE':
                this.updateElement(event.data);
                break;
            case 'DELETE':
                this.deleteElement(event.data);
                break;
            case 'DETAILS':
                if (event.title === 'Element Title') {
                    return;
                }
                event.data = selElem;
                event.data.dataId = Math.random();
            case 'ADD':
            default: this.event.emit(event);
                break;
        }
    }
}
