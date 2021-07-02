import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
    isCheckedTermCondition = false;
    conversationForm: FormGroup;
    logicForm: FormGroup;
    termsAndConditionModal = false;
    userSegmentItemId;

    constructor(
        private uciService: UciService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private modalService: SuiModalService
    ) {
    }

    ngOnInit() {
        this.getConversationAddForm();
        this.conversationForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            purpose: ['', Validators.required],
            startingMessage: ['', Validators.required],
            startDate: [''],
            endDate: ['']
        });
        this.logicForm = this.fb.group({
            id: [null],
            name: [''],
            description: [''],
            formId: ['']
        });

        this.userSegmentItemId = this.activatedRoute.snapshot.paramMap.get('id');
        console.log('-->> this.userSegmentItemId', this.userSegmentItemId);
        if (this.userSegmentItemId) {
            this.getUserSegmentDetail();
        }
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
        if (this.stepIndex === 1 && this.conversationForm.valid) {
            this.stepIndex = 2;
            this.getLogicForm();
        }
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

    openTermAndConditionModel() {
        this.termsAndConditionModal = true;
    }

    onLogicAdd() {
        const reqData = {
            ...this.logicForm.value,
            transformers: [
                {
                    id: 'bbf56981-b8c9-40e9-8067-468c2c753659',
                    meta: {
                        form: 'https://hosted.my.form.here.com',
                        formID: 'ss_form_mpc'
                    }
                }
            ],
            adapter: '44a9df72-3d7a-4ece-94c5-98cf26307324'
        };

        this.isModalLoaderShow = true;
        this.uciService.createLogic({data: reqData}).subscribe(
            (data: any) => {
                this.isModalLoaderShow = false;
                const existingLogic = this.logicForm.value;
                delete existingLogic.id;
                this.selectedLogic.push({
                    id: data.data.id,
                    isOpenDropdown: false,
                    ...existingLogic,
                });
            }, error => {
                this.isModalLoaderShow = false;
            }
        );
    }

    onLogicUpdate() {

    }

    getOpenDropdown(item) {
        if (this.selectedLogic && this.selectedLogic.length) {
            this.selectedLogic.forEach(val => {
                if (item.id === val.id) {
                    val.isOpenDropdown = !item.isOpenDropdown;
                } else {
                    val.isOpenDropdown = false;
                }
            });
        }
        // console.log('--->>', this.selectedLogic);

    }

    getEditLogicData(item) {
        if (item.id) {
            this.logicForm.patchValue({id: item.id, name: item.name, description: item.description});
            // console.log('-->>', this.selectedLogicItemId,  this.logicForm.value);
        }
    }

    onFileUpload(event) {
        console.log(event);
        if (!event.target.files.length) {
            return;
        }
        const file = event.target.files[0];
        const obj = {
            type: 'INFORMATION_SHARING',
            fileType: 'Normal',
            file
        };
        this.uciService.uploadFile(obj).subscribe((fileInfo: any) => {
                console.log('file', fileInfo);
                // this.logicForm.patchValue({formId: fileInfo.id});
            }
        );
    }

    onDelete(logic, index) {
        this.uciService.deleteLogic(logic.id).subscribe(
            file => {
                this.selectedLogic.splice(index, 1);
            }
        );
    }

    getUserSegmentDetail() {
        this.uciService.getBotUserDetails(this.userSegmentItemId).subscribe((val: any) => {
            console.log('--->>>bot user details', val);
            if (val.data) {
                this.conversationForm.patchValue({
                    name: val.data.name,
                    description: val.data.description,
                    purpose: val.data.purpose,
                    startingMessage: val.data.startingMessage,
                    startDate: val.data.startDate,
                    endDate: val.data.endDate
                });
            }

        });
    }
}
