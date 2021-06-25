import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UciService} from '../../services/uci.service';

@Component({
    selector: 'lib-add-segment',
    templateUrl: './add-segment.component.html',
    styleUrls: ['./add-segment.component.css']
})
export class AddSegmentComponent implements OnInit {
    @Output() cancel = new EventEmitter<boolean>();
    @Output() add = new EventEmitter<any>();

    formFieldProperties: Array<any>;
    userSegment;

    constructor(
        private uciService: UciService,) {
    }

    ngOnInit() {
        this.getForm();
    }

    getForm() {
        this.uciService.readForm(
            {
                request: {
                    type: 'content',
                    subType: 'collection',
                    action: 'save',
                    framework: 'ekstep_ncert_k-12',
                    rootOrgId: '01309282781705830427'
                }
            }
        ).subscribe(
            (data: any) => {
                if (data.result && data.result.form && data.result.form.data) {
                    this.formFieldProperties = data.result.form.data.fields;
                }
            }
        );
    }

    onStatusChanges(event) {
        console.log('event', event);
    }

    valueChanges(event) {
        console.log('event value', event);
    }

    onCancel() {
        this.cancel.emit(false);
    }

    onAdd() {
        if (!this.userSegment) {
            return;
        }
        this.add.emit(this.userSegment);
    }
}
