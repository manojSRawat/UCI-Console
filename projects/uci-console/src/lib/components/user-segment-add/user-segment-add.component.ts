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
    userSegment = {};
    isLoaderShow = false;
    districts = [];
    blocks = [];

    constructor(private uciService: UciService,
                private uciGraphQlService: UciGraphQlService) {
    }

    ngOnInit() {
        this.getUciDistrict();
        this.getForm();
        this.getUciCluster();
        this.getUciRole();
        this.getUciBoard();
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
                    if (this.formFieldProperties && this.formFieldProperties.length && this.districts && this.districts.length) {
                        this.formFieldProperties.forEach(value => {
                            if (value.code === 'district') {
                                value.range = [];
                                value.range = this.districts;
                            }
                        });
                    }
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
        for (let value of keys) {
            console.log(value);
            // TODO something wrong here sir please check it
            if (value === 'district') {
                if ((this.userSegment.hasOwnProperty('district') && this.userSegment['district'] !== event.district)) {
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
        const params = {
            state: 'Haryana'
        };
        this.uciGraphQlService.getDistrict(params).subscribe((res: any) => {
            if (res && res.data && res.data.organisation && res.data.organisation.length) {
                this.districts = [];
                res.data.organisation.forEach(d => {
                    this.districts.push(d.district);
                });
            }
            console.log('--->>>district', this.districts);
        });
    }

    getUciBlock(item) {
        const params = {
            state: 'Haryana', district: item.district
        };
        this.uciGraphQlService.getBlock(params).subscribe((res: any) => {
            console.log('--->>uci Block', res);
            if (res && res.data && res.data.organisation && res.data.organisation.length) {
                this.blocks = [];
                res.data.organisation.forEach(d => {
                    this.blocks.push(d.block);
                });
                console.log('--->>>block', this.blocks);
                console.log('--->>>block this.formFieldProperties', this.formFieldProperties);
                this.formFieldProperties.forEach(value => {
                    if (value.code === 'block') {
                        value.range = [];
                        value.range = this.blocks;
                    }
                });
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
}
