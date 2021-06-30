import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UciService} from '../../services/uci.service';

import {SuiModalService} from 'ng2-semantic-ui-v9';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
    isLoaderShow = false;
    isModalLoaderShow = false;
    logicFormRequest = {};
    isCheckedTermCondition: boolean = false;
    conversationForm: FormGroup;
    logicForm: FormGroup;
    constructor(
        private uciService: UciService,
        private router: Router,
        private fb: FormBuilder,
        private modalService: SuiModalService
    ) {
    }

    ngOnInit() {
        this.getConversationAddForm();
        this.conversationForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            startingMessage: ['', Validators.required],
            startDate: [''],
            endDate: ['']
        });
        this.logicForm = this.fb.group({
            name: [''],
            description: [''],
            file: ['']
        });
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
    backToStepOne() {
        if (this.stepIndex === 2) {
            this.stepIndex = 1;
        }
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
        this.formResponse = Object.assign(this.formResponse, event);
    }

    logicValueChanges(event) {
        this.logicFormRequest = Object.assign(this.logicFormRequest, event);
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
        this.selectedLogic.forEach(logic => {
            this.formResponse.logic.push(logic.id);
        });
        Object.assign(this.formResponse, this.conversationForm.value);
        console.log('--->>>this.formResponse', this.formResponse);

        this.isLoaderShow = true;
        this.uciService.botCreate({data: this.formResponse}).subscribe(
            data => {
                this.isLoaderShow = false;
                this.router.navigate(['uci/success']);
            }, error => {
                this.isLoaderShow = false;
            }
        );
    }

    openModel() {
        this.logicFormRequest = {};
        this.collectionListModal = true;
    }

    onLogicAdd() {
        console.log('--->>>logicForm', this.logicForm.value);

        // this.uciService.createLogic({data: this.logicFormRequest}).subscribe(
        //     data => {
        //         this.isModalLoaderShow = true;
        //         this.selectedLogic.push(data);
        //     }, error => {
        //         this.isModalLoaderShow = false;
        //     }
        // );
    }
}
