import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomEvent } from '../classes/custom-event';
import { CustomElement } from '../classes/custom-element';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    @Output() event = new EventEmitter();
    @Input() seldata: CustomElement;

    form: FormGroup;

    constructor() {
        // Reactive Forms
        this.form = new FormGroup({
            title: new FormControl(''),
            description: new FormControl(''),
        });
    }

    ngOnInit() {
        if (this.seldata) {
            this.form.controls['title'].setValue(this.seldata.title);
            this.form.controls['description'].setValue(this.seldata.description);
        }
    }

    /*
        Parent component capture all events and data, send the data to parent
        (Event Driven approach) - Created Custom Events
        Optional - we can trigger addElement from onSubmit using @ViewChild
    */
    onSubmit() {
        let emitdata: any
        let data = this.form.value;

        if (this.seldata) {
            data.dataId = this.seldata.dataId;
            emitdata = new CustomEvent({ n: 'UPDATE', d: data});
        } else {
            emitdata = new CustomEvent({ n: 'CREATE', d: data });            
        }

        this.event.emit(emitdata);
    }

}
