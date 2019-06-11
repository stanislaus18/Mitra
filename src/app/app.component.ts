import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from './table/table.component';
import { CustomElement } from './classes/custom-element';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @ViewChild('table') table: TableComponent;
    seldata: CustomElement;

    showForm = false;
    showDetails = false;

    ngOnInit() { }

    /*
        Single Place to capture all Events (Parent Component)
        Optional - can create and move to CRUD Services for more singleton method            
    */
    event(event: any) {
        this.showForm = false;
        this.showDetails = false;

        switch (event.name) {
            case 'ADD':
                this.seldata = null;
            case 'EDIT':
                this.showForm = true;
                break;
            case 'DETAILS':
                this.showDetails = true;
                this.seldata = event.data;
                break;
            default: this.table.triggerevent(event);
                break;
        }
    }
}
