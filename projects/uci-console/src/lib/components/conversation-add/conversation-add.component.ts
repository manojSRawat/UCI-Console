import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UciService} from '../../services/uci.service';

import {SuiModalService} from 'ng2-semantic-ui-v9';

@Component({
    selector: 'lib-conversation-add',
    templateUrl: './conversation-add.component.html',
    styleUrls: ['./conversation-add.component.css']
})
export class ConversationAddComponent implements OnInit {
    currentViewState = 'ADD_CONVERSATION';
    stepIndex = 1;
    conversationFLowList = [];
    userSegments = [];
    column = '';
    sortDirection = '';
    reverse = false;
    formFieldProperties: Array<any>;
    collectionListModal = false;

    constructor(
        private uciService: UciService,
        private router: Router,
        private modalService: SuiModalService
    ) {
    }

    ngOnInit() {
        this.getForm();
    }

    userSegment() {
        this.currentViewState = 'SELECT_SEGMENT';
    }

    onUserSegmentCancel() {
        this.currentViewState = 'ADD_CONVERSATION';
    }

    onUserSegmentAddClick() {
        this.currentViewState = 'ADD_SEGMENT';
    }

    onUserSegmentAdd(segments) {
        this.userSegments = segments;
        this.currentViewState = 'ADD_CONVERSATION';
    }

    onUserSegmentCreate(segment) {
        this.userSegments.push(segment);
        this.currentViewState = 'ADD_CONVERSATION';
    }

    onUserSegmentDelete(index) {
        this.userSegments.splice(index, 1);
    }

    nextStep() {
        if (this.stepIndex === 1) {
            this.stepIndex = 2;
        }
    }

    sortColumns(column) {
        this.column = column;
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.reverse = !this.reverse;
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

    onAddCancel() {
        this.router.navigate(['uci']);
    }

    onSave() {
    }

    onSubmit() {
        this.router.navigate(['uci/success']);

        // todo uncomment after dynamic form
        /*this.uciService.botCreate({}).subscribe(
            data => {
                this.router.navigate(['uci/success']);
            }
        );*/
    }

    openModel() {
        this.collectionListModal = true;
    }

    onLogicAdd() {
        this.conversationFLowList.push({name: 'Test ' + (this.conversationFLowList.length + 1), step: 1, description: 'test'});
    }
}
