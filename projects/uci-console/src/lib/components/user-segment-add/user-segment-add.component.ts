import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UciService} from '../../services/uci.service';
import {UciGraphQlService} from '../../services/uci-graph-ql.service';

@Component({
    selector: 'lib-user-segment-add',
    templateUrl: './user-segment-add.component.html',
    styleUrls: ['./user-segment-add.component.css']
})
export class UserSegmentAddComponent implements OnInit {
    @Output() cancel = new EventEmitter<boolean>();
    @Output() add = new EventEmitter<any>();
    formFieldProperties: Array<any>;
    userSegment: any = {};
    isLoaderShow = false;
    districts = [];

    constructor(private uciService: UciService,
                private uciGraphQlService: UciGraphQlService) {
    }

    ngOnInit() {
        this.getUciDistrict();
        this.getForm();
        // this.getUciCluster();
        // this.getUciRole();
        // this.getUciBoard();
    }

    getForm() {
        console.log('------> getting form');
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
                    console.log('xxxxxxxxxxxxxxx', this.formFieldProperties);
                    this.patchValues('district', this.districts);
                }
            }
        );
    }

    onStatusChanges(event) {
        console.log('event', event);
    }

    valueChanges(event) {
        console.log('event value', event);
        const keys = ['district', 'block'];
        for (const value of keys) {
            console.log(value);
            if (value === 'district') {
                if (this.userSegment.district !== event.district && event.district) {
                    this.getUciBlock(event);
                }
            }
        }
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

    getUciState() {
        this.uciGraphQlService.getState().subscribe(res => {
            console.log('--->>uci state', res);
        });
    }

    getUciDistrict() {
        console.log('------> getting district');
        const params = {
            state: 'Haryana'
        };
        this.uciGraphQlService.getDistrict(params).subscribe((res: any) => {
            if (res && res.data && res.data.organisation && res.data.organisation.length) {
                this.districts = [];
                res.data.organisation.forEach(d => {
                    this.districts.push(d.district);
                });
                this.patchValues('district', this.districts);
            }
        });
    }

    getUciBlock(item) {
        const params = {
            state: 'Haryana', district: item.district
        };
        this.uciGraphQlService.getBlock(params).subscribe((res: any) => {
            console.log('--->>uci Block', res);
            if (res && res.data && res.data.organisation && res.data.organisation.length) {
                const blocks = [];
                res.data.organisation.forEach(d => {
                    blocks.push(d.block);
                });
                console.log('--->>>block', blocks);
                console.log('--->>>block this.formFieldProperties', this.formFieldProperties);
                this.patchValues('block', blocks);
            }
        });
    }

    getUciCluster() {
        const params = {
            state: 'Haryana', district: 'Ambala', block: 'Saha'
        };
        this.uciGraphQlService.getClusters(params).subscribe((res: any) => {
            console.log('--->>uci cluster', res);
        });
    }

    getUciSchoolDetails() {
        const params = {
            state: 'Haryana', district: 'Ambala', block: 'Saha'
        };
        this.uciGraphQlService.getSchoolDetails(params).subscribe((res: any) => {
            console.log('--->>uci school details', res);
        });
    }

    getUciRole() {
        this.uciGraphQlService.getRole().subscribe((res: any) => {
            console.log('--->>uci Role', res);
        });
    }

    getUciBoard() {
        this.uciGraphQlService.getBoards().subscribe((res: any) => {
            console.log('--->>uci board', res);
        });
    }

    patchValues(key, values) {
        console.log('===>', key, values);
        if (this.formFieldProperties && this.formFieldProperties.length && this.districts && this.districts.length && values.length) {
            console.log('===> Doing some changes', key, values);
            this.formFieldProperties.forEach(value => {
                if (value.code === key) {
                    value.range = [];
                    value.range = values;
                }
            });
        }
    }
}
