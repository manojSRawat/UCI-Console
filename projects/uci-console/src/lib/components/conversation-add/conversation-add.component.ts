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
    selectedLogic = [];
    userSegments = [];
    column = '';
    sortDirection = '';
    reverse = false;
    conversationFormFieldProperties: Array<any>;
    logicFormFieldProperties: Array<any>;
    collectionListModal = false;
    formResponse = {
        users: [],
        logic: []
    };
    isLoaderShow: boolean = false;
    isModalLoaderShow: boolean = false;
    constructor(
        private uciService: UciService,
        private router: Router,
        private modalService: SuiModalService
    ) {
    }

    ngOnInit() {
        this.getConversationAddForm();
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

        this.getLogicForm();
    }

    sortColumns(column) {
        this.column = column;
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.reverse = !this.reverse;
    }

    getConversationAddForm() {
        this.uciService.readForm(
            {
                request: {
                    type: 'conversation',
                    subType: 'global',
                    action: 'menubar',
                    framework: 'ekstep_ncert_k-12',
                    rootOrgId: '*'
                }
            }
        ).subscribe(
            (data: any) => {
                if (data.result && data.result.form && data.result.form.data) {
                    this.conversationFormFieldProperties = data.result.form.data.fields;
                }
            }
        );
    }

    getLogicForm() {
        this.uciService.readForm(
            {
                request: {
                    type: 'conversationLogic',
                    subType: 'global',
                    action: 'menubar',
                    framework: 'ekstep_ncert_k-12',
                    rootOrgId: '*'
                }
            }
        ).subscribe(
            (data: any) => {
                if (data.result && data.result.form && data.result.form.data) {
                    this.logicFormFieldProperties = data.result.form.data.fields;
                }
            }
        );
    }

    onStatusChanges(event) {
        console.log('event', event);
    }

    valueChanges(event) {
        console.log('event value', event);
        this.formResponse = Object.assign(this.formResponse, event);
        console.log('event value', this.formResponse);
    }

    onAddCancel() {
        this.router.navigate(['uci']);
    }

    onSave() {
    }

    onSubmit() {
        this.formResponse.users = [];
        this.formResponse.logic = [];
        this.userSegments.forEach(userSegment => {
            this.formResponse.users.push(userSegment.id);
        });
        this.isLoaderShow = true;
        this.uciService.botCreate({data: this.formResponse}).subscribe(
            data => {
                this.isLoaderShow = false;
                this.router.navigate(['uci/success']);
            },  error => {
                this.isLoaderShow = false;
            }
        );
    }

    openModel() {
        this.collectionListModal = true;
    }

    onLogicAdd() {
        this.selectedLogic.push({name: 'Test ' + (this.selectedLogic.length + 1), step: 1, description: 'test'});
        this.isModalLoaderShow = true;
    }
}
