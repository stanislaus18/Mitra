import { CustomElement } from './custom-element';

export class CustomEvent {
    name: string;
    data: CustomElement;
    constructor({ n, d }: { n: string; d?: CustomElement; }) {
        this.name = n;
        this.data = d;
    }
}