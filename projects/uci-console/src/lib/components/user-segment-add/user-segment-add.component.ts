import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UciService} from '../../services/uci.service';

@Component({
    selector: 'lib-user-segment-add',
    templateUrl: './user-segment-add.component.html',
    styleUrls: ['./user-segment-add.component.css']
})
export class UserSegmentAddComponent implements OnInit {
    @Output() cancel = new EventEmitter<boolean>();
    @Output() add = new EventEmitter<any>();

    formFieldProperties: Array<any>;
    userSegment = {};
    isLoaderShow = false;

    constructor(private uciService: UciService) {
    }

    ngOnInit() {
        this.getForm();
    }

    getForm() {
        this.uciService.readForm(
            {
                request: {
                    type: 'userSegment',
                    subType: 'global',
                    action: 'menubar',
                    framework: 'ekstep_ncert_k-12',
                    rootOrgId: '*'
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
        this.userSegment = Object.assign(this.userSegment, event);
    }

    onCancel() {
        this.cancel.emit(false);
    }

    onAdd() {
        this.isLoaderShow = true;
        this.uciService.createUserSegment({data: this.userSegment}).subscribe(
            data => {
                this.isLoaderShow = false;
                this.afterAdd(data);
            }, err => {
                this.isLoaderShow = false;
            }
        );
    }

    afterAdd(data) {
        this.add.emit(data);
    }
}
